import {ExecutionLog} from '@prisma/client'

export const LogLevels = ['info', 'error', 'warning'] as const
export type LogLevel = (typeof LogLevels)[number]

export type LogFunction = (message: string) => void
export type Log = {
  message: string
  level: LogLevel
  timestamp: Date
}

export type LogCollector = {
  getAll(): Log[]
} & {
  [K in LogLevel]: LogFunction
}
