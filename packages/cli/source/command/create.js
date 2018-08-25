const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Listr = require('listr')
const vfs = require('vinyl-fs')
const inquirer = require('inquirer')
const { promisify } = require('util')
const template = require('gulp-template')

const { installDependencies } = require('../util/npm')

async function create ({ root }, { directory: folderName = 'slides' }) {
  const options = {
    template: 'presentation',
    year: (new Date()).getFullYear()
  }

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

  const directory = path.isAbsolute(folderName) ? folderName : path.join(root, folderName)

  process.stdout.write('\n')

  const tasks = new Listr([
    // 1. Create project structure
    {
      title: `Creating is project structure in "${folderName}" dir`,
      async task () {
        await promisify(fs.mkdir)(directory)

        await new Promise((resolve, reject) => {
          vfs.src(['**/**'], {
            cwd: path.join(__dirname, '..', '..', 'templates', options.template)
          })
            .pipe(template(options))
            .pipe(vfs.dest(directory))
            .on('end', resolve)
            .on('error', reject)
        })
      }
    },

    // 3. Install dependencies
    {
      title: 'Installing dependencies',
      task: () => installDependencies(directory, ['shower-core', `shower-${options.theme}`])
    }
  ])

  await tasks.run()

  process.stdout.write(`\n Project created in ${chalk.green(folderName)} dir 🎉\n`)
}

module.exports = create
