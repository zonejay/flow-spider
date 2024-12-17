import {TaskType} from '@/types/task'
import {WorkflowTask} from '@/types/workflow'
import {AddPropertyToJsonTask} from './AddPropertyToJson'
import {ClickElementTask} from './ClickElement'
import {DeliverViaWebhookTask} from './DeliverViaWebhook'
import {ExtractDataWithAITask} from './ExtractDataWithAI'
import {ExtractTextFromElementTask} from './ExtractTextFromElement'
import {FillInputTask} from './FillInput'
import {LaunchBrowserTask} from './LaunchBrowser'
import {PageToHtmlTask} from './PageToHtml'
import {ReadPropertyFromJsonTask} from './ReadPropertyFromJson'
import {WaitForElementTask} from './WaitForElement'
import {NavigateUrlTask} from './NavigateUrl'
import {ScrollToElementTask} from './ScrollToElement'

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
  [TaskType.DELIVER_VIA_WEBHOOK]: DeliverViaWebhookTask,
  [TaskType.EXTRACT_DATA_WITH_AI]: ExtractDataWithAITask,
  [TaskType.READ_PROPERTY_FROM_JSON]: ReadPropertyFromJsonTask,
  [TaskType.ADD_PROPERTY_TO_JSON]: AddPropertyToJsonTask,
  [TaskType.NAVIGATE_URL]: NavigateUrlTask,
  [TaskType.SCROLL_TO_ELEMENT]: ScrollToElementTask
}
