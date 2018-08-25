const { create } = require('browser-sync')

function serve ({ root: cwd }, { port, open }) {
  const bs = create()

  return new Promise((resolve, reject) => {
    bs.init({
      cwd,
      port,
      open,
      server: '.'
    }, err => {
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

module.exports = serve
