import {NodeProps} from '@xyflow/react'
import {memo} from 'react'
import NodeCard from './NodeCard'
import NodeHeader from './NodeHeader'
import {AppNode} from '@/types/appNode'
import {TaskRegistry} from '@/lib/workflow/task/registry'
import {NodeInput, NodeInputs} from './NodeInputs'
import {NodeOutput, NodeOutputs} from './NodeOutputs'

const NodeComponent = memo((props: NodeProps<AppNode>) => {
  const nodeData = props.data
  const task = TaskRegistry[nodeData.type]
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} nodeId={props.id} />
        ))}
      </NodeOutputs>
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = 'NodeComponent'
