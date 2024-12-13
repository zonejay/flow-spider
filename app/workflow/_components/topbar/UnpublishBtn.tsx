'use client'

import {PublishWorkflow} from '@/actions/workflows/publishWorkflow'
import {UnpublishWorkflow} from '@/actions/workflows/unpublishWorkflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'
import {useReactFlow} from '@xyflow/react'
import {DownloadIcon, UploadIcon} from 'lucide-react'
import {toast} from 'sonner'

export default function UnpublishBtn({workflowId}: {workflowId: string}) {
  const generate = useExecutionPlan()
  const {toObject} = useReactFlow()

  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
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
        toast.loading('Unpublishing workflow...', {id: workflowId})
        mutation.mutate({
          id: workflowId
        })
      }}
      className="flex items-center gap-2"
      variant={'outline'}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  )
}
