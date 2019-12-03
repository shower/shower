const chalk = require('chalk')
const puppeteer = require('puppeteer-core')
const { getPlatform } = require('chrome-launcher/dist/utils.js')
const chromeFinder = require('chrome-launcher/dist/chrome-finder.js')

function evalCalcExpression (value) {
  const expression = value
    .replace(/calc/g, '')
    .replace(/px/g, '')

  // eslint-disable-next-line no-eval
  return eval(expression) + 'px'
}

async function handler ({ cwd, output }) {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (await (chromeFinder)[getPlatform()]())[0]
  if (!executablePath) {
    throw new Error('Chrome / Chromium is not installed or environment variable PUPPETEER_EXECUTABLE_PATH is not set')
  }
  let browser = await puppeteer.launch({ executablePath })
  let page = await browser.newPage()

  await page.goto(`file://${cwd}/index.html`)

  const [width, height] = await page.evaluate(async () => {
    const container = document.querySelector('.shower')

    const styles = window.getComputedStyle(container)

    return [
      styles.getPropertyValue('--slide-width'),
      styles.getPropertyValue('--slide-height')
    ]
  })

  await page.pdf({
    path: output,
    width: evalCalcExpression(width),
    height: evalCalcExpression(height)
  })

  browser.close()
}

function builder (yargs) {
  return yargs
    .options({
      output: {
        alias: 'o',
        type: 'string',
        default: 'index.pdf',
        describe: 'File name'
      }
    })
}

function messages ({ output }) {
  return {
    start: 'Creating PDF in progress',
    end: chalk`PDF built in {bold ${output}}`
  }
}

module.exports = { handler, builder, messages }
