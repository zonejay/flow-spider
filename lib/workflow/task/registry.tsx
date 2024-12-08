import {TaskType} from '@/types/task'
import {LaunchBrowserTask} from './LaunchBrowser'

export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask
}
