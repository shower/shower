const fs = require('fs')
const del = require('del')
const path = require('path')
const chalk = require('chalk')
const Listr = require('listr')
const vfs = require('vinyl-fs')
const inquirer = require('inquirer')
const { promisify } = require('util')
const template = require('gulp-template')

const { installDependencies } = require('../lib/npm')

const cmdArgs = [
  {
    name: 'yes',
    alias: ['y'],
    default: false,
    type: 'boolean'
  },
  {
    name: 'force',
    default: false,
    type: 'boolean'
  },
  {
    name: 'no-interactive',
    alias: ['s'],
    default: false,
    type: 'boolean'
  },
  {
    name: 'theme',
    alias: ['t'],
    default: 'ribbon',
    type: 'list',
    choices: ['ribbon', 'material'],
    interactive: true
  },
  {
    name: 'ratio',
    alias: ['r'],
    default: '16:9',
    type: 'list',
    choices: ['16:9', '4:3'],
    interactive: true
  }
]

function prepareOptions (args) {
  const opts = {}
  for (const index in args) {
    const n = args[index].name
    opts[n] = args[index]
    delete opts[n].name
    if ('interactive' in opts[n]) {
      delete opts[n].interactive
    }
  }
  return opts
}

function prepareParams (args) {
  const pars = []
  for (const index in args) {
    if ('interactive' in args[index]) {
      if ('interactive' in args[index]) {
        delete args[index].interactive
      }
      if ('choices' in args[index]) {
        args[index].type = 'list'
      }
      pars.push(args[index])
    }
  }
  return pars
}

async function handler ({
  cwd,
  directory: folderName = 'slides',
  yes: isDefault,
  force: isOverride = false,
  'no-interactive': isNonInteractive = false,
  theme: themeName = 'ribbon',
  ratio: aspectRatio = '16:9'
}) {
  // Let's check if such folder exists
  const directory = path.isAbsolute(folderName) ? folderName : path.join(cwd, folderName)

  if (fs.existsSync(directory)) {
    if (!isOverride) {
      const { isForce } = await inquirer.prompt({
        name: 'isForce',
        type: 'confirm',
        default: false,
        message: `The ${chalk.yellow(folderName)} dir already exists. Do you want to overwrite it?`
      })

      if (isForce) {
        await del([directory])
      } else {
        process.stdout.write(chalk.red('\n Creating aborted\n'))

        return
      }
    } else {
      await del([directory])
    }
  }

  const options = {
    template: 'presentation',
    year: (new Date()).getFullYear()
  }

  const defaultParams = {
    theme: 'ribbon',
    ratio: '16:9'
  }

  const params = prepareParams(cmdArgs)

  if (isDefault) {
    Object.assign(options, defaultParams)
  } else if (isNonInteractive) {
    Object.assign(options, {
      theme: themeName,
      ratio: aspectRatio
    })
  } else {
    Object.assign(options, await inquirer.prompt(params))
  }

  if (params[0].choices.includes(themeName) && params[1].choices.includes(aspectRatio)) {
    process.stdout.write(chalk.red('\n Creating aborted. Choose valid values.\n'))
  }

  options.ratio = options.ratio.replace(/:/, ' / ')

  process.stdout.write('\n')

  const tasks = new Listr([
    // 1. Create project structure
    {
      title: `Creating project structure in "${folderName}" dir`,
      async task () {
        await promisify(fs.mkdir)(directory)

        await new Promise((resolve, reject) => {
          const files = ['**', '**/.*']

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

    // 2. Install dependencies
    {
      title: 'Installing dependencies',
      task: () => Promise.all([
        installDependencies(directory, ['@shower/cli'], 'save-dev'),
        installDependencies(directory, ['@shower/core', `@shower/${options.theme}`])
      ])
    }
  ])

  await tasks.run()
}

function builder (yargs) {
  return yargs
    .options(prepareOptions(cmdArgs))
    .positional('directory', {
      default: 'slides',
      type: 'string'
    })
}

function messages ({ directory: folderName = 'slides' }) {
  return {
    end: `Project created in ${chalk.bold(folderName)} dir`
  }
}

module.exports = { handler, builder, messages }
