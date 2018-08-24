const vfs = require('vinyl-fs')
const zip = require('gulp-zip')

const { preparedPresentation } = require('../util/files')

function archive (_, { file }) {
  const stream = preparedPresentation()
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
