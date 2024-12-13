'use client'

import TooltipWrapper from '@/components/TooltipWrapper'
import {Button, buttonVariants} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {cn} from '@/lib/utils'
import {WorkflowExecutionStatus, WorkflowStatus} from '@/types/workflow'
import {Workflow} from '@prisma/client'
import {DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu'
import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoreVertical,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon
} from 'lucide-react'
import Link from 'next/link'
import React, {useState} from 'react'
import DeleteWorkflowDialog from './DeleteWorkflowDialog'
import RunBtn from '@/app/workflow/_components/RunBtn'
import SchedulerDialog from './SchedulerDialog'
import {Badge} from '@/components/ui/badge'
import ExecutionStatusIndicator from '@/app/workflow/runs/[workflowId]/_component/ExecutionStatusIndicator'
import {format, formatDistanceToNow} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'

type Props = {
  workflow: Workflow
}

const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-primary'
}

function WorkflowCard({workflow}: Props) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? <FileTextIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 text-white" />}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link href={`/workflow/editor/${workflow.id}`} className="flex items-center hover:underline">
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
            <ScheduleSection
              isDraft={isDraft}
              creditsCost={workflow.creditsCost}
              workflowId={workflow.id}
              cron={workflow.cron!}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm'
              }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  )
}

function WorkflowActions({workflowName, workflowId}: {workflowName: string; workflowId: string}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <TooltipWrapper content={'More actions'}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVertical size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev)
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default WorkflowCard

function ScheduleSection({
  isDraft,
  creditsCost,
  workflowId,
  cron
}: {
  isDraft: boolean
  creditsCost: number
  workflowId: string
  cron: string
}) {
  if (isDraft) return null
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog workflowId={workflowId} workflowCron={cron} key={`${cron}-${workflowId}`} />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <Badge variant={'outline'} className="space-x-2 text-muted-foreground rounded-sm">
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  )
}

export function LastRunDetails({workflow}: {workflow: Workflow}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT

  if (isDraft) {
    return null
  }

  const {lastRunAt, lastRunStatus, lastRunId, nextRunAt} = workflow
  const formattedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, {addSuffix: true})
  const nextSchedule = nextRunAt && format(nextRunAt, 'yyyy-MM-dd HH:mm:ss')
  const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt, 'UTC', 'HH:mm')

  return (
    <div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link href={`/workflow/runs/${workflow.id}/${lastRunId}`} className="flex items-center text-sm gap-2 group">
            <span>Last run:</span>
            <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus} />
            <span>{lastRunStatus}</span>
            <span>{formattedStartedAt}</span>
            <ChevronRightIcon size={14} className="-translate-x-[2px] group-hover:translate-x-0 transition" />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center text-sm gap-2">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  )
}
