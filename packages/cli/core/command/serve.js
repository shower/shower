const { create } = require('browser-sync')

function handler ({ cwd, port, open, ui, notify }) {
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

function builder (yargs) {
  return yargs
    .options({
      open: {
        alias: 'o',
        type: 'bool',
        default: false,
        describe: 'Open browser'
      },
      port: {
        alias: 'p',
        type: 'number',
        default: 8080,
        describe: 'Listening Port'
      },
      ui: {
        type: 'bool',
        default: false,
        describe: 'Whether to run BrowserSync UI'
      },
      notify: {
        type: 'bool',
        default: false,
        describe: 'Whether to show BrowserSync notifications'
      }
    })
}

function messages () {
  return {}
}

module.exports = { handler, builder, messages }
