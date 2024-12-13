'use client'

import {PublishWorkflow} from '@/actions/workflows/publishWorkflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'
import {useReactFlow} from '@xyflow/react'
import {UploadIcon} from 'lucide-react'
import {toast} from 'sonner'

export default function PublishBtn({workflowId}: {workflowId: string}) {
  const generate = useExecutionPlan()
  const {toObject} = useReactFlow()

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow published', {id: workflowId})
    },
    onError: () => {
      toast.error('Something went wrong', {id: workflowId})
    }
  })

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate()
        if (!plan) {
          return
        }
        toast.loading('Publishing workflow...', {id: workflowId})
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject())
        })
      }}
      className="flex items-center gap-2"
      variant={'outline'}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  )
}
