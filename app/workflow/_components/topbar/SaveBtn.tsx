'use client'

import UpdateWorkflow from '@/actions/workflows/updateWorkflow'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'
import {useReactFlow} from '@xyflow/react'
import {CheckIcon} from 'lucide-react'
import {toast} from 'sonner'

type Props = {
  workflowId: string
}

export default function SaveBtn({workflowId}: Props) {
  const {toObject} = useReactFlow()

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success('Flow saved successfully', {id: 'save-workflow'})
    },
    onError: () => {
      toast.error('Something went wrong', {id: 'save-workflow'})
    }
  })

  return (
    <Button
      disabled={saveMutation.isPending}
      variant={'outline'}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject())
        console.log(workflowDefinition)

        toast.loading('Saveing workflow...', {id: 'save-workflow'})
        saveMutation.mutate({id: workflowId, definition: workflowDefinition})
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  )
}
