import {ExecutionEnviroment} from '@/types/executor'
import {ClickElementTask} from '../task/ClickElement'
import {DeliverViaWebhookTask} from '../task/DeliverViaWebhook'

export async function DeliverViaWebhookExecutor(
  enviroment: ExecutionEnviroment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = enviroment.getInput('Target Url')
    if (!targetUrl) {
      enviroment.log.error('targetUrl not defined')
    }

    const body = enviroment.getInput('Body')
    if (!targetUrl) {
      enviroment.log.error('body not defined')
    }

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const statusCode = res.status
    if (statusCode !== 200) {
      enviroment.log.error(`status code: ${statusCode}`)
      return false
    }

    const resBody = await res.json()
    enviroment.log.info(JSON.stringify(resBody, null, 4))
    return true
  } catch (error: any) {
    enviroment.log.error(error)
    return false
  }
}
