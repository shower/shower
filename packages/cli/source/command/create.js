const fs = require('fs')
const del = require('del')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const Listr = require('listr')
const vfs = require('vinyl-fs')
const inquirer = require('inquirer')
const { promisify } = require('util')
const template = require('gulp-template')

const { isExist } = require('../util/files')
const { installDependencies } = require('../util/npm')

async function create ({ root }, { directory: folderName = 'slides' }) {
  // Let's check if such folder exists
  const directory = path.isAbsolute(folderName) ? folderName : path.join(root, folderName)

  if (isExist(directory)) {
    const { isForce } = await inquirer.prompt({
      name: 'isForce',
      type: 'confirm',
      default: false,
      message: `The ${chalk.yellow(folderName)} dir already exists. Do you want to overwrite it?`
    })

    if (isForce) {
      await del([directory])
    } else {
      process.stdout.write(chalk.red(`\n Creating aborted\n`))

      return
    }
  }

  const options = {
    template: 'presentation',
    year: (new Date()).getFullYear()
  }

  const params = [{
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
  }]

  try {
    await execa('which', ['git'])

    params.push({
      name: 'isGit',
      type: 'confirm',
      default: true,
      message: 'To create a git repository?'
    })
  } catch (e) {}

  Object.assign(options, await inquirer.prompt(params))

  process.stdout.write('\n')

  const tasks = new Listr([
    // 1. Create project structure
    {
      title: `Creating is project structure in "${folderName}" dir`,
      async task () {
        await promisify(fs.mkdir)(directory)

        await new Promise((resolve, reject) => {
          const files = ['**', '**/.*']

          if (!options.isGit) {
            files.push('!.gitignore')
          }

          vfs.src(files, {
            cwd: path.join(__dirname, '..', '..', 'templates', options.template)
          })
            .pipe(template(options))
            .pipe(vfs.dest(directory))
            .on('end', resolve)
            .on('error', reject)
        })
      }
    },

    // 2. Initialize git repository
    ...(options.isGit ? [
      {
        title: 'Initialize git repository',
        task: () => execa('git', ['init'], { cwd: directory })
      }
    ] : []),

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
