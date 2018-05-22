const opn = require('opn')
const path = require('path')
const puppeteer = require('puppeteer')
const { createServer } = require('http')
const { Server: StaticServer } = require('node-static')

const utils = require('./utils')

const ROOT = process.env.PWD

module.export = {
  pdf () {
    const fileName = 'presentation.pdf'

    console.log('Run to create pdf')

    let browser, page

    return Promise.resolve()
      .then(() => {
        browser = puppeteer.launch()

        return browser
      })
      .then(() => {
        page = browser.newPage()

        return page
      })
      .then(() => page.goto(`file://${ ROOT }/index.html`))
      .then(() => page.pdf({ path: fileName, width: '960px', height: '600px' }))
      .then(() => {
        browser.close()
      })
  },

  create () {
    const template = 'http://shwr.me/shower.zip'

    console.log('Run to create new project\n')

    const archive = path.join(ROOT, 'shower.zip')

    return Promise.resolve()
      .then(() => {
        console.log(`-- Download template...`)
        return utils.download({ url: template, destination: archive })
      })
      .then(() => {
        console.log(`-- Unzip...`)
        return utils.unzip({ file: archive, destination: ROOT })
      })
      .then(() => {
        console.log(`-- Clear...`)
        return utils.remove({ file: archive })
      })
  },

  serve (options) {
    const port = options.port || 8080

    return new Promise((resolve, reject) => {
      const server = new StaticServer(ROOT)

      const app = createServer((request, response) => {
        request.addListener('end', () => {
          server.serve(request, response)
        }).resume()
      })

      app.on('error', reject)

      app.listen(port, error => {
        if (error) {
          reject(error)
        }

        if (options.open) {
          opn(`http://localhost:${ port }`)
        }

        console.log(`Server listening "${ port }" port...`)
      })
    })
  }
}
