import {TaskType} from '@/types/task'
import {LaunchBrowserExecutor} from './LaunchBrowserExecutor'
import {PageToHtmlExecutor} from './PageToHtmlExecutor'
import {ExecutionEnviroment} from '@/types/executor'
import {WorkflowTask} from '@/types/workflow'
import {ExtractTextFromElementExecutor} from './ExtractTextFromElementExecutor'
import {FillInputExecutor} from './FillInputExecutor'
import {ClickElementExecutor} from './ClickElementExecutor'
import {WaitForElementExecutor} from './WaitForElementExecutor'

type ExecutorFn<T extends WorkflowTask> = (enviroment: ExecutionEnviroment<T>) => Promise<boolean>

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & {type: K}>
}

export const ExecutorRegistry: RegistryType = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserExecutor,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementExecutor,
  [TaskType.PAGE_TO_HTML]: PageToHtmlExecutor,
  [TaskType.FILL_INPUT]: FillInputExecutor,
  [TaskType.CLICK_ELEMENT]: ClickElementExecutor,
  [TaskType.WAIT_FOR_ELEMENT]: WaitForElementExecutor
}
