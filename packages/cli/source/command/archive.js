const vfs = require('vinyl-fs')
const zip = require('gulp-zip')
const chalk = require('chalk')

const { loadPresentationFiles } = require('../lib/presentation')

function archive ({ output, files }) {
  const stream = loadPresentationFiles(files)
    .pipe(zip(output))
    .pipe(vfs.dest('.'))

  return new Promise((resolve, reject) => {
    stream
      .on('end', resolve)
      .on('error', reject)
  })
}

archive.messages = ({ output }) => ({
  start: 'The project is being archived',
  end: chalk`Created archive {bold ${output}} with presentation`
})

module.exports = archive
