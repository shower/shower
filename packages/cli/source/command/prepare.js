const vfs = require('vinyl-fs')
const path = require('path')

const { loadPresentationFiles } = require('../core/load_presentation_files')

function prepare ({ root }, { directory }) {
  if (!path.isAbsolute(directory)) {
    directory = path.join(root, directory)
  }

  const stream = loadPresentationFiles()
    .pipe(vfs.dest(directory))

  return new Promise((resolve, reject) => {
    stream
      .on('end', resolve)
      .on('error', reject)
  })
}

prepare.messages = {
  start: 'Project preparation in progress',
  end: 'Project prepared'
}

module.exports = prepare
