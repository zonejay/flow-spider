'use client'
import TooltipWrapper from '@/components/TooltipWrapper'
import {Button} from '@/components/ui/button'
import {Tooltip} from '@/components/ui/tooltip'
import {ChevronLeftIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import React from 'react'
import SaveBtn from './SaveBtn'
import ExecuteBtn from './ExecuteBtn'
import NavigationTabs from './NavigationTabs'

type Props = {
  title: string
  subtitle?: string
  workflowId: string
  hideButtons?: boolean
}

export default function Topbar({title, subtitle, workflowId, hideButtons = false}: Props) {
  const router = useRouter()
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div className="w-[200px]">
          <p className="font-bold truncate">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex gap-1 flex-1 justify-end">
        {/* ExecuteBtn里面使用了context，需要provider包裹，但是topbar可能会在没有provider的环境中使用 */}
        {!hideButtons && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            <SaveBtn workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  )
}
