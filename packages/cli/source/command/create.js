const fs = require('fs')
const path = require('path')
const vfs = require('vinyl-fs')
const inquirer = require('inquirer')
const { promisify } = require('util')
const template = require('gulp-template')

const { installDependencies } = require('../util/npm')

async function create ({ root }, { directory = 'slides' }) {
  const options = {
    template: 'presentation',
    year: (new Date()).getFullYear()
  }

  process.stdout.write('\n')

  const params = await inquirer
    .prompt([{
      name: 'name',
      type: 'input',
      default: 'slides',
      message: 'Input presentation name'
    }, {
      name: 'theme',
      type: 'list',
      message: 'Select theme',
      choices: ['ribbon', 'material']
    }, {
      name: 'ratio',
      type: 'input',
      default: '16 / 9',
      message: 'Select presentation ratio'
    }])

  Object.assign(options, params)

  if (path.isAbsolute(directory)) {
    directory = path.join(root, directory)
  }

  // 1. Create new folder
  await promisify(fs.mkdir)(directory)

  // 2. Create 'index.html'and 'package.json'
  await new Promise((resolve, reject) => {
    vfs.src(['**/**'], {
      cwd: path.join(__dirname, '..', '..', 'templates', options.template)
    })
      .pipe(template(options))
      .pipe(vfs.dest(directory))
      .on('end', resolve)
      .on('error', reject)
  })

  // 3. Install dependencies
  await installDependencies(directory, ['shower-core', `shower-${options.theme}`])
}

create.messages = {
  start: 'Creating new project in progress',
  end: 'Project created'
}

module.exports = create
