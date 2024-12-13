import {AppNode} from '@/types/appNode'
import {TaskRegistry} from './task/registry'

export function CalculateWorkflowCost(nodes: AppNode[]) {
  return nodes.reduce((prev, cur) => {
    return prev + TaskRegistry[cur.data.type].credits
  }, 0)
}
