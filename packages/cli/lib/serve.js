const opn = require('opn')
const { createServer } = require('http')
const { Server: StaticServer } = require('node-static')

module.exports = function serve ({ root }, { port, open }) {
  return new Promise((resolve, reject) => {
    const server = new StaticServer(root)

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

      if (open) {
        opn(`http://localhost:${ port }`)
      }

      console.log(`Server listening "${ port }" port...`)
    })
  })
}
