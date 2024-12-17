'use server'

import {PeriodToDateRange} from '@/lib/helper/dates'
import prisma from '@/lib/prisma'
import {Period} from '@/types/analytics'
import {ExecutionPhaseStatus, WorkflowExecutionStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'
import {eachDayOfInterval, format} from 'date-fns'

export async function GetCreditsUsageInPeriod(selectedPeriod: Period) {
  const {userId} = auth()
  if (!userId) {
    throw new Error('unauthenticated')
  }

  const dateRange = PeriodToDateRange(selectedPeriod)
  const data = await prisma.executionPhase.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate
      },
      status: {
        in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED]
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
  data.forEach((item) => {
    const date = format(item.startedAt!, 'yyyy-MM-dd')
    if (item.status === ExecutionPhaseStatus.COMPLETED) {
      stats[date].success += item.creditsConsumed ?? 0
    }
    if (item.status === ExecutionPhaseStatus.FAILED) {
      stats[date].failed += item.creditsConsumed ?? 0
    }
  })
  const result = Object.entries(stats).map(([date, infos]) => ({date, ...infos}))
  return result
}
