import {TaskType} from '@/types/task'
import {LaunchBrowserTask} from './LaunchBrowser'
import {PageToHtmlTask} from './PageToHtml'
import {ExtractTextFromElementTask} from './ExtractTextFromElement'
import {WorkflowTask} from '@/types/workflow'
import {FillInputTask} from './FillInput'
import {ClickElementTask} from './ClickElement'
import {WaitForElementTask} from './WaitForElement'
import {DeliverViaWebhookTask} from './DeliverViaWebhook'

type Registry = {
  [K in TaskType]: WorkflowTask & {type: K}
}

export const TaskRegistry: Registry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
  [TaskType.PAGE_TO_HTML]: PageToHtmlTask,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementTask,
  [TaskType.FILL_INPUT]: FillInputTask,
  [TaskType.CLICK_ELEMENT]: ClickElementTask,
  [TaskType.WAIT_FOR_ELEMENT]: WaitForElementTask,
  [TaskType.DELIVER_VIA_WEBHOOK]: DeliverViaWebhookTask
}
