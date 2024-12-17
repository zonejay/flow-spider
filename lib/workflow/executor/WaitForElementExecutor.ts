import {ExecutionEnviroment} from '@/types/executor'
import {ClickElementTask} from '../task/ClickElement'
import {WaitForElementTask} from '../task/WaitForElement'

export async function WaitForElementExecutor(
  enviroment: ExecutionEnviroment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = enviroment.getInput('Selector')
    if (!selector) {
      enviroment.log.error('input->selector not defined')
    }

    const visibility = enviroment.getInput('Visibility')
    if (!visibility) {
      enviroment.log.error('input->selector not defined')
    }

    await enviroment.getPage()!.waitForSelector(selector, {
      visible: visibility === 'visible',
      hidden: visibility === 'hidden'
    })

    enviroment.log.info(`Element ${selector} become: ${visibility}`)

    return true
  } catch (error: any) {
    enviroment.log.error(error.message)

    return false
  }
}
