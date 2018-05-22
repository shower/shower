const fs = require('fs')
const path = require('path')
const yauzl = require('yauzl')
const mkdirp = require('mkdirp')

module.exports = function unzip ({ file, destination = '.' }) {
  return new Promise((resolve, reject) => {
    yauzl.open(file, { lazyEntries: true }, (error, zipfile) => {
      if (error) {
        reject(error); return
      }

      zipfile.readEntry()

      zipfile.on('end', resolve)
      zipfile.on('error', reject)
      zipfile.on('close', resolve)

      zipfile.on('entry', entry => {
        if (/\/$/.test(entry.fileName)) {
          mkdirp(entry.fileName, () => zipfile.readEntry())
        } else {
          const out =
            fs.createWriteStream(path.join(destination, entry.fileName))

          zipfile.openReadStream(entry, (readError, readStream) => {
            if (readError) {
              reject(readError); return
            }

            readStream.on('error', reject)
            readStream.on('end', () => zipfile.readEntry())

            readStream.pipe(out)
          })
        }
      })
    })
  })
}
