import {ExecutionEnviroment} from '@/types/executor'
import {ClickElementTask} from '../task/ClickElement'
import {ReadPropertyFromJsonTask} from '../task/ReadPropertyFromJson'
import {AddPropertyToJsonTask} from '../task/AddPropertyToJson'

export async function AddPropertyToJsonExecutor(
  enviroment: ExecutionEnviroment<typeof AddPropertyToJsonTask>
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

    const propertyValue = enviroment.getInput('Property value')
    if (!propertyValue) {
      enviroment.log.error('input->propertyValue not defined')
    }

    const json = JSON.parse(jsonData)
    json[propertyName] = propertyValue

    enviroment.setOutput('Update JSON', JSON.stringify(json))

    return true
  } catch (error: any) {
    enviroment.log.error(error.message)
    return false
  }
}
