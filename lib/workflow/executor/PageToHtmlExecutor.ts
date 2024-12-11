import {ExecutionEnviroment} from '@/types/executor'
import {PageToHtmlTask} from '../task/PageToHtml'

export async function PageToHtmlExecutor(enviroment: ExecutionEnviroment<typeof PageToHtmlTask>): Promise<boolean> {
  try {
    const html = await enviroment.getPage()!.content()
    console.log('@@PAGE HTML', html)
    enviroment.setOutput('Html', html)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
