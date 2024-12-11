import {ExecutionEnviroment} from '@/types/executor'
import puppeteer from 'puppeteer'
import {LaunchBrowserTask} from '../task/LaunchBrowser'
export async function LaunchBrowserExecutor(
  enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviroment.getInput('Website Url')
    const browser = await puppeteer.launch({
      headless: false
    })
    enviroment.setBrowser(browser)
    const page = await browser.newPage()
    await page.goto(websiteUrl)
    enviroment.setPage(page)
    return true
  } catch (error: any) {
    enviroment.log.error(error.message)
    return false
  }
}
