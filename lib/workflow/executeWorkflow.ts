import 'server-only'
import prisma from '../prisma'
import {revalidatePath} from 'next/cache'
import {ExecutionPhaseStatus, WorkflowExecutionStatus} from '@/types/workflow'
import {WorkflowExecution} from '@prisma/client'

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

  const enviroment = {phases: {}}

  await initializeWorkflowExecution(executionId, execution.workflowId)
  await initializePhaseStatuses(execution)

  let creditsConsumed = 0
  let executionFailed = false

  for (const phase of execution.phases) {
  }

  await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)

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
