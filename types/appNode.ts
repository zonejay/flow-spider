import {Node} from '@xyflow/react'
import {TaskParam, TaskType} from './task'

export interface AppNodeData {
  type: TaskType
  inputs: Record<string, string>
  [key: string]: any
}

export interface AppNode extends Node {
  data: AppNodeData
}

export type ParamProps = {
  param: TaskParam
  value: string
  updateNodeParamValue: (val: string) => void
  disabled?: boolean
}
