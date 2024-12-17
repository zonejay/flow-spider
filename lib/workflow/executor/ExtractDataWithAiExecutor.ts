import {ExecutionEnviroment} from '@/types/executor'
import {ClickElementTask} from '../task/ClickElement'
import {ExtractDataWithAITask} from '../task/ExtractDataWithAI'
import prisma from '@/lib/prisma'
import {symmetricDecrypt} from '@/lib/encryption'
import OpenAI from 'openai'

export async function ExtractDataWithAiExecutor(
  enviroment: ExecutionEnviroment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = enviroment.getInput('Credentials')
    if (!credentials) {
      enviroment.log.error('input->credentials not defined')
    }

    const prompt = enviroment.getInput('Prompt')
    if (!prompt) {
      enviroment.log.error('input->prompt not defined')
    }

    const content = enviroment.getInput('Content')
    if (!prompt) {
      enviroment.log.error('input->content not defined')
    }

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials
      }
    })

    if (!credential) {
      enviroment.log.error('credential not found')
      return false
    }

    const plainCredentialValue = symmetricDecrypt(credential.value)
    if (!plainCredentialValue) {
      enviroment.log.error('cannot decrypt credential')
      return false
    }

    const mockExtractedData = {
      usernameSelector: '#username',
      passwordSelector: '#password',
      loginSelector: 'body > div > form > input.btn.btn-primary'
    }

    const openai = new OpenAI({
      apiKey: plainCredentialValue,
      baseURL: 'https://openai.api2d.net/v1'
    })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text'
        },
        {
          role: 'user',
          content
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 1
    })

    enviroment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`)
    enviroment.log.info(`Completition tokens: ${response.usage?.completion_tokens}`)

    const result = response.choices[0].message.content
    if (!result) {
      enviroment.log.error('empty response from ai')
      return false
    }

    enviroment.setOutput('Extracted data', result)

    return true
  } catch (error: any) {
    enviroment.log.error(error.message)
    return false
  }
}
