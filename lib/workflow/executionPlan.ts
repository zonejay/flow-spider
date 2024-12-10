import {AppNode, AppNodeMissingInputs} from '@/types/appNode'
import {WorkflowExecutionPlan, WorkflowExecutionPlanPhase} from '@/types/workflow'
import {Edge} from '@xyflow/react'
import {TaskRegistry} from './task/registry'

export enum FlowToExecutionPlanValidationError {
  'NO_ENRTY_POINT',
  'INVALID_INPUTS'
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan
  error?: {
    type: FlowToExecutionPlanValidationError
    invalidElements?: AppNodeMissingInputs[]
  }
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {
  const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint)
  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENRTY_POINT
      }
    }
  }

  const inputsWithErrors: AppNodeMissingInputs[] = []
  const planned = new Set<string>()
  const invalidInputs = getInvalidInputs(entryPoint, edges, planned)

  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs
    })
  }

  planned.add(entryPoint.id)

  const executionPlan: WorkflowExecutionPlan = [{phase: 1, nodes: [entryPoint]}]

  for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
    const nextPhase: WorkflowExecutionPlanPhase = {phase, nodes: []}

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned)
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges)
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.error('invalid inputs', currentNode.id, invalidInputs)
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs
          })
        } else {
          continue
        }
      }

      nextPhase.nodes.push(currentNode)
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id)
    }
    executionPlan.push(nextPhase)
  }

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors
      }
    }
  }

  return {executionPlan}
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs: string[] = []
  const inputs = TaskRegistry[node.data.type].inputs
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name]
    const inputValueProvided = inputValue?.length > 0

    if (inputValueProvided) {
      continue
    }

    const incomingEdges = edges.filter((edge) => edge.target === node.id)

    const inputLinkedToOutput = incomingEdges.find((edge) => edge.targetHandle === input.name)

    const requiredInputProvidedByVisitedOutput =
      input.required && inputLinkedToOutput && planned.has(inputLinkedToOutput.source)

    if (requiredInputProvidedByVisitedOutput) {
      continue
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue
      }
    }
    console.log(input.name)

    invalidInputs.push(input.name)
  }

  return invalidInputs
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) {
    return []
  }

  const incommersIds = new Set()

  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incommersIds.add(edge.source)
    }
  })

  return nodes.filter((n) => incommersIds.has(n.id))
}
