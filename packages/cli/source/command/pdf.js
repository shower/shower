const chalk = require('chalk')
const puppeteer = require('puppeteer')

function evalCalcExpression (value) {
  const expression = value
    .replace(/calc/g, '')
    .replace(/px/g, '')

  // eslint-disable-next-line no-eval
  return eval(expression) + 'px'
}

async function pdf ({ cwd }, { output }) {
  let browser = await puppeteer.launch()
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

pdf.messages = (_, { output }) => ({
  start: 'Creating PDF in progress',
  end: chalk`PDF built in {bold ${output}}`
})

module.exports = pdf
