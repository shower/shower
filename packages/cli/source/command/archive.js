const vfs = require('vinyl-fs')
const zip = require('gulp-zip')
const chalk = require('chalk')

const { loadPresentationFiles } = require('../core/load_presentation_files')

function archive (_, { file }) {
  const stream = loadPresentationFiles()
    .pipe(zip(file))
    .pipe(vfs.dest('.'))

  return new Promise((resolve, reject) => {
    stream
      .on('end', resolve)
      .on('error', reject)
  })
}

archive.config = {
  requiredExistingPresentation: true
}

archive.messages = (_, { file }) => ({
  start: 'The project is being archived',
  end: `Created archive ${chalk.bold(file)} with presentation`
})

module.exports = archive
