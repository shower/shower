const vfs = require('vinyl-fs')
const zip = require('gulp-zip')
const chalk = require('chalk')
const getStream = require('get-stream')

const { loadPresentationFiles } = require('../lib/presentation')

function archive (_, { output, files }) {
  const stream = loadPresentationFiles(files)
    .pipe(zip(output))
    .pipe(vfs.dest('.'))

  return getStream(stream)
}

archive.messages = (_, { output }) => ({
  start: 'The project is being archived',
  end: chalk`Created archive {bold ${output}} with presentation`
})

module.exports = archive
