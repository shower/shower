import tmp from 'tmp'
import vfs from 'vinyl-fs'
import pages from 'gh-pages'
import { promisify } from 'node:util'

import { loadPresentationFiles } from '../lib/presentation.js'

function handler ({ files }) {
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

function builder (yargs) {
  return yargs
    .options({
      files: {
        alias: 'f',
        array: true,
        type: 'string',
        describe: 'List of files that will get the build'
      }
    })
}

function messages () {
  return {
    end: 'Project published'
  }
}

export { handler, builder, messages }
