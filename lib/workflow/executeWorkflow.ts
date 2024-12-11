import 'server-only'
import prisma from '../prisma'
import {revalidatePath} from 'next/cache'
import {ExecutionPhaseStatus, WorkflowExecutionStatus} from '@/types/workflow'
import {ExecutionPhase, WorkflowExecution} from '@prisma/client'
import {AppNode} from '@/types/appNode'
import {TaskRegistry} from './task/registry'
import {waitFor} from '../helper/waitFor'
import {TaskParamType, TaskType} from '@/types/task'
import {ExecutorRegistry} from './executor/registry'
import {Environment, ExecutionEnviroment} from '@/types/executor'
import {Browser, Page} from 'puppeteer'
import {Edge} from '@xyflow/react'
import {LogCollector} from '@/types/log'
import {createLogCollector} from '../log'

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId
    },
    include: {
      workflow: true,
      phases: true
    }
  })

  if (!execution) {
    throw new Error('execution not found')
  }

  const edges = JSON.parse(execution.definition).edges as Edge[]

  const enviroment: Environment = {phases: {}}

  await initializeWorkflowExecution(executionId, execution.workflowId)
  await initializePhaseStatuses(execution)

  let creditsConsumed = 0
  let executionFailed = false

  for (const phase of execution.phases) {
    const logCollector = createLogCollector()
    const phaseExecution = await executeWorkflowPhase(phase, enviroment, edges)
    if (!phaseExecution.success) {
      executionFailed = true
    }
  }

  await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)

  await cleanupEnvironment(enviroment)

  revalidatePath('/workflow/runs')
}

async function initializeWorkflowExecution(executionId: string, workflowId: string) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING
    }
  })

  await prisma.workflow.update({
    where: {
      id: workflowId
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId
    }
  })
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id)
      }
    },
    data: {
      status: ExecutionPhaseStatus.PENDING
    }
  })
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) {
  const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED

  await prisma.workflowExecution.update({
    where: {id: executionId},
    data: {status: finalStatus, completedAt: new Date(), creditsConsumed}
  })

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId
      },
      data: {
        lastRunStatus: finalStatus
      }
    })
    .catch((err) => {})
}

async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment, edges: Edge[]) {
  const logCollector = createLogCollector()
  const startedAt = new Date()
  const node = JSON.parse(phase.node) as AppNode
  setupEnvironmentForPhase(node, environment, edges)

  await prisma.executionPhase.update({
    where: {
      id: phase.id
    },
    data: {
      startedAt,
      status: ExecutionPhaseStatus.RUNNING,
      inputs: JSON.stringify(environment.phases[node.id].inputs)
    }
  })

  const creditsRequired = TaskRegistry[node.data.type].credits

  console.log(`Execution phase ${phase.name} with ${creditsRequired} credits required`)

  const success = await executePhase(phase, node, environment, logCollector)

  const outputs = environment.phases[node.id].outputs
  await finalizePhase(phase.id, success, outputs, logCollector)

  return {success}
}

async function finalizePhase(phaseId: string, success: boolean, outputs: any, logCollector: LogCollector) {
  const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED

  await prisma.executionPhase.update({
    where: {
      id: phaseId
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            message: log.message,
            timestamp: log.timestamp,
            logLevel: log.level
          }))
        }
      }
    }
  })
}

async function executePhase(
  phase: ExecutionPhase,
  node: AppNode,
  enviroment: Environment,
  logCollector: LogCollector
): Promise<boolean> {
  const runFn = ExecutorRegistry[node.data.type]
  if (!runFn) {
    return false
  }

  const executionEnviroment: ExecutionEnviroment = createExecutionEnvironment(node, enviroment, logCollector)

  return await runFn(executionEnviroment)
}

function setupEnvironmentForPhase(node: AppNode, enviroment: Environment, edges: Edge[]) {
  enviroment.phases[node.id] = {
    inputs: {},
    outputs: {}
  }
  const inputsDefinition = TaskRegistry[node.data.type].inputs
  for (const input of inputsDefinition) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue
    }
    const inputValue = node.data.inputs[input.name]
    if (inputValue) {
      enviroment.phases[node.id].inputs[input.name] = inputValue
      continue
    }
    const connectedEdge = edges.find((edge) => edge.target === node.id && edge.targetHandle === input.name)

    if (!connectedEdge) {
      console.error('Missing edge for input', input.name, 'node id', node.id)
      continue
    }

    const outputValue = enviroment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!]

    enviroment.phases[node.id].inputs[input.name] = outputValue
  }
}

function createExecutionEnvironment(
  node: AppNode,
  enviroment: Environment,
  logCollector: LogCollector
): ExecutionEnviroment {
  return {
    getInput: (name: string) => enviroment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      enviroment.phases[node.id].outputs[name] = value
    },

    getBrowser: () => enviroment.browser,
    setBrowser: (browser: Browser) => (enviroment.browser = browser),

    getPage: () => enviroment.page,
    setPage: (page: Page) => (enviroment.page = page),
    log: logCollector
  }
}

async function cleanupEnvironment(enviroment: Environment) {
  if (enviroment.browser) {
    await enviroment.browser.close().catch((err) => console.error(err))
  }
}
