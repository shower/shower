const vfs = require('vinyl-fs')
const zip = require('gulp-zip')

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

archive.messages = {
  start: 'The project is being archived',
  end: 'Project archived'
}

module.exports = archive
