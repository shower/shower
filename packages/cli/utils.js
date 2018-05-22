const fs = require('fs')
const path = require('path')
const yauzl = require('yauzl')
const wget = require('node-wget')
const { promisify } = require('util')

module.exports.download = ({ url, destination }) =>
  new Promise((resolve, reject) => {
    wget({ url, dest: destination }, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })

function mkdirp (dir) {
  return new Promise(resolve => {
    if (dir === '.') {
      resolve(); return
    }

    fs.stat(dir, error => {
      if (error === null) { // already exists
        resolve(); return
      }

      mkdirp(path.dirname(dir)).then(() => fs.mkdir(dir, resolve))
    })
  })
}

module.exports.unzip = ({ file, destination = '.' }) =>
  new Promise((resolve, reject) => {
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
          mkdirp(entry.fileName)
            .then(() => zipfile.readEntry())
            .catch(reject)
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

module.exports.remove = ({ file }) => promisify(fs.unlink)(file)
