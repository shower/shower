const fs = require('fs')
const path = require('path')
const vfs = require('vinyl-fs')
const { promisify } = require('util')
const template = require('gulp-template')

const { installDependencies } = require('../util/npm')

function create ({ root }, { directory = 'slides' }) {
  const options = {
    name: 'slides',
    ratio: '16 / 9',
    theme: 'ribbon',
    template: 'presentation',
    year: (new Date()).getFullYear()
  }

  if (path.isAbsolute(directory)) {
    directory = path.join(root, directory)
  }

  return Promise.resolve()
    // 1. Create new folder
    .then(() => promisify(fs.mkdir)(directory))

    // 2. Create 'index.html'and 'package.json'
    .then(() => new Promise((resolve, reject) => {
      vfs.src(['**/**'], {
        cwd: path.join(__dirname, '..', '..', 'templates', options.template)
      })
        .pipe(template(options))
        .pipe(vfs.dest(directory))
        .on('end', resolve)
        .on('error', reject)
    }))

    // 3. Install dependencies
    .then(() => installDependencies(directory, ['shower-core', `shower-${options.theme}`]))
}

create.messages = {
  start: 'Creating new project in progress',
  end: 'Project created'
}

module.exports = create
