const { create } = require('browser-sync')

function serve ({ cwd }, { port, open, ui, notify }) {
  const bs = create()

  const options = {
    cwd,
    port,
    open,
    notify,
    ui: ui ? { port } : false,
    server: '.'
  }

  return new Promise((resolve, reject) => {
    bs.init(options, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })

    bs.watch('**/*.*', { cwd })
      .on('change', bs.reload)
  })
}

serve.messages = {}

module.exports = serve
