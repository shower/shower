const puppeteer = require('puppeteer')

module.exports = function pdf ({ root }, { file }) {
  console.log('Run to create pdf')

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
    .then(() => page.goto(`file://${ root }/index.html`))
    .then(() => page.pdf({ path: file, width: '960px', height: '600px' }))
    .then(() => {
      browser.close()
    })
}
