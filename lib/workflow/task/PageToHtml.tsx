import {TaskParamType, TaskType} from '@/types/task'
import {CodeIcon, GlobeIcon, LucideProps} from 'lucide-react'

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  lable: 'Get html from page',
  icon: (props: LucideProps) => <CodeIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ],
  outputs: [
    {name: 'Html', type: TaskParamType.STRING},
    {name: 'Web page', type: TaskParamType.BROWSER_INSTANCE}
  ]
}
