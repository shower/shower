const tmp = require('tmp')
const vfs = require('vinyl-fs')
const pages = require('gh-pages')
const { promisify } = require('util')

const { loadPresentationFiles } = require('../lib/presentation')

function publish (_, { files }) {
  let tempDirPath = null
  let cleanupCallback = null

  return new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (error, p, c) => {
      if (error) {
        reject(error)
      }

      tempDirPath = p
      cleanupCallback = c

      resolve()
    })
  })
    .then(() => {
      const stream = loadPresentationFiles(files)
        .pipe(vfs.dest(tempDirPath))

      return new Promise((resolve, reject) => {
        stream
          .on('end', resolve)
          .on('error', reject)
      })
    })
    .then(() => promisify(pages.publish)(tempDirPath))
    .then(() => cleanupCallback())
    .catch((error) => {
      tmp.setGracefulCleanup()

      throw error
    })
}

publish.messages = {
  start: 'The project is being published',
  end: 'Project published'
}

module.exports = publish
