'use client'

import {RunWorkflow} from '@/actions/workflows/runWorkflow'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'
import {PlayIcon} from 'lucide-react'
import {toast} from 'sonner'

export default function RunBtn({workflowId}: {workflowId: string}) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Workflow started', {id: workflowId})
    },
    onError: () => {
      toast.error('Something went wrong', {id: workflowId})
    }
  })
  return (
    <Button
      onClick={() => {
        toast.loading('Scheduling run...', {id: workflowId})
        mutation.mutate({workflowId})
      }}
      variant={'outline'}
      size={'sm'}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  )
}
