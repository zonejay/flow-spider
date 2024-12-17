'use server'

import {PeriodToDateRange} from '@/lib/helper/dates'
import prisma from '@/lib/prisma'
import {Period} from '@/types/analytics'
import {WorkflowExecutionStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'

export async function GetStatsCardsValues(period: Period) {
  const {userId} = auth()
  if (!userId) {
    throw new Error('unauthenticated')
  }

  const dateRange = PeriodToDateRange(period)
  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      createdAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate
      },
      status: {
        in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED]
      }
    },
    select: {
      creditsConsumed: true,
      phases: {
        where: {
          creditsConsumed: {
            not: null
          }
        },
        select: {
          creditsConsumed: true
        }
      }
    }
  })

  const stats = {
    workflowExecutions: executions.length,
    creditsConsumend: 0,
    phaseExecutions: 0
  }

  stats.creditsConsumend = executions.reduce((sum, execution) => sum + execution.creditsConsumed, 0)

  stats.phaseExecutions = executions.reduce((sum, execution) => sum + execution.phases.length, 0)

  return stats
}
