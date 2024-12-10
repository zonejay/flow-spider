import {FlowToExecutionPlan, FlowToExecutionPlanValidationError} from '@/lib/workflow/executionPlan'
import {AppNode} from '@/types/appNode'
import {useReactFlow} from '@xyflow/react'
import {useCallback} from 'react'
import useFlowValidation from './useFlowValidation'
import {error} from 'console'
import {toast} from 'sonner'

const useExecutionPlan = () => {
  const {toObject} = useReactFlow<AppNode>()
  const {setInvalidInputs, clearErrors} = useFlowValidation()

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENRTY_POINT:
          toast.error('No entry point found')
          break
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error('Not all inputs values are set')
          setInvalidInputs(error.invalidElements)
          break
        default:
          toast.error('something went wrong')
          break
      }
    },
    [setInvalidInputs]
  )

  const generateExecutionPlan = useCallback(() => {
    const {edges, nodes} = toObject()
    const {executionPlan, error} = FlowToExecutionPlan(nodes, edges)

    if (error) {
      handleError(error)
      return null
    }
    clearErrors()
    return executionPlan
  }, [toObject, handleError, clearErrors])

  return generateExecutionPlan
}
export default useExecutionPlan
