import {FlowToExecutionPlan} from '@/lib/workflow/executionPlan'
import {AppNode} from '@/types/appNode'
import {useReactFlow} from '@xyflow/react'
import {useCallback} from 'react'

const useExecutionPlan = () => {
  const {toObject} = useReactFlow<AppNode>()

  const generateExecutionPlan = useCallback(() => {
    const {edges, nodes} = toObject()
    const result = FlowToExecutionPlan(nodes, edges)
  }, [toObject])

  return generateExecutionPlan
}
export default useExecutionPlan
