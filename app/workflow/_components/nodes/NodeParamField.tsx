'use client'

import {Input} from '@/components/ui/input'
import {TaskParam, TaskParamType} from '@/types/task'
import StringParam from './param/StringParam'
import {useReactFlow} from '@xyflow/react'
import {AppNode} from '@/types/appNode'
import {useCallback} from 'react'
import BrowserInstanceParam from './param/BrowserInstanceParam'

function NodeParamField({param, nodeId, disabled}: {param: TaskParam; nodeId: string; disabled: boolean}) {
  const {updateNodeData, getNode} = useReactFlow<AppNode>()
  const node = getNode(nodeId)
  const value = node?.data.inputs?.[param.name] ?? ''
  console.log('@value', value)

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue
        }
      })
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  )

  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam disabled={disabled} param={param} value={value} updateNodeParamValue={updateNodeParamValue} />

    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} value={''} updateNodeParamValue={updateNodeParamValue} />

    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not implemented</div>
        </div>
      )
  }
}

export default NodeParamField
