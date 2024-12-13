import {TaskParamType, TaskType} from '@/types/task'
import {WorkflowTask} from '@/types/workflow'
import {CodeIcon, Edit3Icon, GlobeIcon, LucideProps} from 'lucide-react'

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: 'Fill Input',
  credits: 1,
  icon: (props: LucideProps) => <Edit3Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: 'Value',
      type: TaskParamType.STRING,
      required: true
    }
  ] as const,
  outputs: [{name: 'Web page', type: TaskParamType.BROWSER_INSTANCE}] as const
} satisfies WorkflowTask
