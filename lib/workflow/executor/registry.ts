import {TaskType} from '@/types/task'
import {LaunchBrowserExecutor} from './LaunchBrowserExecutor'
import {PageToHtmlExecutor} from './PageToHtmlExecutor'
import {ExecutionEnviroment} from '@/types/executor'
import {WorkflowTask} from '@/types/workflow'
import {ExtractTextFromElementExecutor} from './ExtractTextFromElementExecutor'
import {FillInputExecutor} from './FillInputExecutor'
import {ClickElementExecutor} from './ClickElementExecutor'
import {WaitForElementExecutor} from './WaitForElementExecutor'
import {DeliverViaWebhookExecutor} from './DeliverViaWebhookExecutor'
import {ExtractDataWithAiExecutor} from './ExtractDataWithAiExecutor'
import {ReadPropertyFromJsonExecutor} from './ReadPropertyFromJsonExecutor'
import {AddPropertyToJsonExecutor} from './AddPropertyToJsonExecutor'
import {NavigateUrlExecutor} from './NavigateUrlExecutor'
import {ScrollToElementExecutor} from './ScrollToElementExecutor'

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
  [TaskType.WAIT_FOR_ELEMENT]: WaitForElementExecutor,
  [TaskType.DELIVER_VIA_WEBHOOK]: DeliverViaWebhookExecutor,
  [TaskType.EXTRACT_DATA_WITH_AI]: ExtractDataWithAiExecutor,
  [TaskType.READ_PROPERTY_FROM_JSON]: ReadPropertyFromJsonExecutor,
  [TaskType.ADD_PROPERTY_TO_JSON]: AddPropertyToJsonExecutor,
  [TaskType.NAVIGATE_URL]: NavigateUrlExecutor,
  [TaskType.SCROLL_TO_ELEMENT]: ScrollToElementExecutor
}
