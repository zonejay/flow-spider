import {TaskType} from '@/types/task'
import {LaunchBrowserTask} from './LaunchBrowser'
import {PageToHtmlTask} from './PageToHtml'

export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
  [TaskType.PAGE_TO_HTML]: PageToHtmlTask
}
