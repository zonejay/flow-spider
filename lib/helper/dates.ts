import {Period} from '@/types/analytics'
import {endOfMonth, intervalToDuration, startOfMonth} from 'date-fns'

export function DatesToDurationString(end: Date | null | undefined, start: Date | null | undefined) {
  if (!start || !end) {
    return null
  }

  const timeElapsed = end.getTime() - start.getTime()

  if (timeElapsed < 1000) {
    return `${timeElapsed}ms`
  }

  const duration = intervalToDuration({start: 0, end: timeElapsed})

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`
}

// 根据period中的month和year，返回start和end
export function PeriodToDateRange(period: Period) {
  const startDate = startOfMonth(new Date(period.year, period.month))
  const endDate = endOfMonth(new Date(period.year, period.month))
  return {startDate, endDate}
}
