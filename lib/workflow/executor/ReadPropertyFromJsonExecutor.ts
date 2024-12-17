import {ExecutionEnviroment} from '@/types/executor'
import {ClickElementTask} from '../task/ClickElement'
import {ReadPropertyFromJsonTask} from '../task/ReadPropertyFromJson'

export async function ReadPropertyFromJsonExecutor(
  enviroment: ExecutionEnviroment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = enviroment.getInput('JSON')
    if (!jsonData) {
      enviroment.log.error('input->jsonData not defined')
    }

    const propertyName = enviroment.getInput('Property name')
    if (!propertyName) {
      enviroment.log.error('input->propertyName not defined')
    }

    const json = JSON.parse(jsonData)
    const propertyValue = json[propertyName]

    if (propertyValue === undefined) {
      enviroment.log.error('property not found')
      return false
    }

    enviroment.setOutput('Property Value', propertyValue)

    return true
  } catch (error: any) {
    enviroment.log.error(error.message)

    return false
  }
}
