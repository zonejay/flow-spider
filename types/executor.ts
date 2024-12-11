import {Workflow} from '@prisma/client'
import {Browser, Page} from 'puppeteer'
import {WorkflowTask} from './workflow'

export type Environment = {
  page?: Page
  browser?: Browser
  phases: {
    [key: string]: {
      inputs: Record<string, string>
      outputs: Record<string, string>
    }
  }
}

export type ExecutionEnviroment<T extends WorkflowTask = any> = {
  getInput(name: T['inputs'][number]['name']): string
  setOutput(name: T['outputs'][number]['name'], value: string): void

  getBrowser(): Browser | null | undefined
  setBrowser(browser: Browser): void

  getPage(): Page | undefined
  setPage(page: Page): void
}
