'use server'

import {PeriodToDateRange} from '@/lib/helper/dates'
import prisma from '@/lib/prisma'
import {Period} from '@/types/analytics'
import {WorkflowExecutionStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'
import {eachDayOfInterval, format} from 'date-fns'

export async function GetWorkflowExecutionsStatus(selectedPeriod: Period) {
  const {userId} = auth()
  if (!userId) {
    throw new Error('unauthenticated')
  }

  const dateRange = PeriodToDateRange(selectedPeriod)
  const data = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate
      }
    }
  })
  const stats: Record<string, {success: number; failed: number}> = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate
  })
    .map((date) => format(date, 'yyyy-MM-dd'))
    .reduce((acc, date) => {
      acc[date] = {
        success: 0,
        failed: 0
      }
      return acc
    }, {} as any)
  data.forEach((execution) => {
    const date = format(execution.startedAt!, 'yyyy-MM-dd')
    if (execution.status === WorkflowExecutionStatus.COMPLETED) {
      stats[date].success++
    }
    if (execution.status === WorkflowExecutionStatus.FAILED) {
      stats[date].failed++
    }
  })
  const result = Object.entries(stats).map(([date, infos]) => ({date, ...infos}))
  return result
}
