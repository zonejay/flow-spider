import {Log, LogCollector, LogFunction, LogLevel, LogLevels} from '@/types/log'

export function createLogCollector(): LogCollector {
  const logs: Log[] = []
  const getAll = () => {
    console.log(logs)
    return logs
  }
  const logFunction = {} as Record<LogLevel, LogFunction>
  LogLevels.forEach((level) => {
    logFunction[level] = (message: string) => logs.push({level, message, timestamp: new Date()})
  })
  return {
    getAll,
    ...logFunction
  }
}
