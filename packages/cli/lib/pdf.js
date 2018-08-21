const puppeteer = require('puppeteer')

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
    .then(() => page.pdf({ path: file, width: '960px', height: '600px' }))
    .then(() => {
      browser.close()
    })
}

pdf.messages = (_, { file }) => ({
  start: 'Creating PDF in progress',
  end: `PDF built in '${file}'`
})

module.exports = pdf
