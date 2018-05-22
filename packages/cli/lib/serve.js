const opn = require('opn')
const { createServer } = require('http')
const { Server: StaticServer } = require('node-static')

function serve ({ root }, { port, open }) {
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
    })
  })
}

serve.messages = (_, { port }) => ({
  start: `Server listening ${ port } port`
})

module.exports = serve
