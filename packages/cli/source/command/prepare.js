const vfs = require('vinyl-fs')
const chalk = require('chalk')
const path = require('path')
const del = require('del')

const { loadPresentationFiles } = require('../lib/presentation')

function prepare ({ cwd }, { output, files }) {
  if (!path.isAbsolute(output)) {
    output = path.join(cwd, output)
  }

  const stream = loadPresentationFiles(files)
    .pipe(vfs.dest(output))

  del.sync([output])

  return new Promise((resolve, reject) => {
    stream
      .on('end', resolve)
      .on('error', reject)
  })
}

prepare.messages = (_, { output }) => ({
  start: 'Project preparation in progress',
  end: chalk`Project prepared in {bold ${output}} dir`
})

module.exports = prepare
