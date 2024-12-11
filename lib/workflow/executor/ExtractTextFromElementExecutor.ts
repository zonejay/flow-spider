import {ExecutionEnviroment} from '@/types/executor'
import {PageToHtmlTask} from '../task/PageToHtml'
import {ExtractTextFromElementTask} from '../task/ExtractTextFromElement'
import * as cheerio from 'cheerio'

export async function ExtractTextFromElementExecutor(
  enviroment: ExecutionEnviroment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = enviroment.getInput('Selector')
    if (!selector) {
      console.error('selector not found')

      return false
    }

    const html = enviroment.getInput('Html')

    if (!html) {
      console.error('html not found')

      return false
    }

    const $ = cheerio.load(html)
    const element = $(selector)

    if (!element) {
      console.error('Element not found')
      return false
    }

    const extractedText = $.text(element)
    if (!extractedText) {
      console.error('Element has no text')
      return false
    }

    enviroment.setOutput('Extracted text', extractedText)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
