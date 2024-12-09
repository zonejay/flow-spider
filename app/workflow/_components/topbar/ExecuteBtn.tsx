'use client'

import {Button} from '@/components/ui/button'
import {PlayIcon} from 'lucide-react'

export default function ExecuteBtn({workflowId}: {workflowId: string}) {
  return (
    <Button className="flex items-center gap-2" variant={'outline'}>
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  )
}
