const chalk = require('chalk')
const puppeteer = require('puppeteer')

function evalCalcExpression (expression) {
  // eslint-disable-next-line no-eval
  return eval(expression.replace(/calc/g, '').replace(/px/g, '')) + 'px'
}

function pdf ({ cwd }, { output }) {
  let browser, page

  return Promise.resolve()
    .then(() => puppeteer.launch())
    .then(b => {
      browser = b
    })
    .then(() => browser.newPage())
    .then(p => {
      page = p
    })
    .then(() => page.goto(`file://${cwd}/index.html`))
    .then(() => page.evaluate(() => new Promise((resolve) => {
      const container = document.querySelector('.shower')

      const styles = window.getComputedStyle(container)

      resolve({
        width: styles.getPropertyValue('--slide-width'),
        height: styles.getPropertyValue('--slide-height')
      })
    })))
    .then((size) => {
      const width = evalCalcExpression(size.width)
      const height = evalCalcExpression(size.height)

      return page.pdf({
        path: output, width, height
      })
    })
    .catch(error => {
      if (browser) {
        browser.close()
      }

      throw error
    })
    .then(() => {
      browser.close()
    })
}

pdf.messages = (_, { ouput }) => ({
  start: 'Creating PDF in progress',
  end: chalk`PDF built in {bold ${ouput}}`
})

module.exports = pdf
