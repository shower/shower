const puppeteer = require('puppeteer')

function evalCalcExpression (expression) {
  // eslint-disable-next-line no-eval
  return eval(expression.replace(/calc/g, '').replace(/px/g, '')) + 'px'
}

function pdf ({ root }, { file }) {
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
    .then(() => page.goto(`file://${root}/index.html`))
    .then(() => page.evaluate(async () => {
      const container = document.querySelector('.shower')

      const styles = window.getComputedStyle(container)

      return [
        evalCalcExpression(styles.getPropertyValue('--slide-width')),
        evalCalcExpression(styles.getPropertyValue('--slide-height'))
      ]
    }))
    .then(([width, height]) => page.pdf({ path: file, width, height }))
    .catch(error => {
      console.error(error)
    })
    .then(() => {
      browser.close()
    })
}

pdf.messages = (_, { file }) => ({
  start: 'Creating PDF in progress',
  end: `PDF built in '${file}'`
})

module.exports = pdf
