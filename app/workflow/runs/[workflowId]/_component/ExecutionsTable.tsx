'use client'

import {GetWorkflowExecutions} from '@/actions/workflows/getWorkflowExecutions'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {DatesToDurationString} from '@/lib/helper/dates'
import {WorkflowExecution} from '@prisma/client'
import {useQuery} from '@tanstack/react-query'
import React from 'react'
import ExecutionStatusIndicator from './ExecutionStatusIndicator'
import {WorkflowExecutionStatus} from '@/types/workflow'
import {CoinsIcon} from 'lucide-react'
import {formatDistanceToNow} from 'date-fns'
import {useRouter} from 'next/navigation'

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>

export default function ExecutionsTable({workflowId, initialData}: {workflowId: string; initialData: InitialDataType}) {
  const router = useRouter()
  const query = useQuery({
    queryKey: ['executions', workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000
  })
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground">Started at (desc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map((execution, index) => {
            const duration = DatesToDurationString(execution.completedAt, execution.startedAt)
            const formattedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(execution.startedAt, {
                addSuffix: true
              })
            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/workflow/runs/${execution.workflowId}/${execution.id}`)
                }}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="text-muted-foreground text-xs">
                      <span>Triggered via</span>
                      <Badge variant={'outline'}>{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <ExecutionStatusIndicator status={execution.status as WorkflowExecutionStatus} />
                      <span className="font-semibold capitalize">{execution.status}</span>
                    </div>
                    <div className="text-muted-foreground text-xs mx-5">{duration}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <CoinsIcon size={16} className="text-primary" />
                      <span className="font-semibold capitalize">{execution.creditsConsumed}</span>
                    </div>
                    <div className="text-muted-foreground text-xs mx-5">Credits</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{formattedStartedAt}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
