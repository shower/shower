const chalk = require('chalk')
const semver = require('semver')

const pkg = require('../package.json')

process.title = pkg.name

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${chalk.bold(process.version)}, ` +
      `but this version of ${chalk.bold(pkg.name)} requires Node ${chalk.bold(pkg.engines.node)}.\n` +
      'Please upgrade your Node version.'
    )
  )

  process.exit(1)
}

const app = require('yargs')
const Listr = require('listr')
const updateNotifier = require('update-notifier')

// Warn the user about new versions
updateNotifier({ pkg }).notify()

const { getEnv } = require('./lib/env')

app.strict()
app.locale('en')
app.version(pkg.version)
app.scriptName('shower')
app.usage(chalk`Usage: {bold $0 [--version] [--help] <command> [<args>]}`)
app.epilog(chalk`See {bold $0 <command> --help} to read about a specific subcommand.`)

app.alias('h', 'help')
app.alias('v', 'version')

app.options({
  cwd: {
    default: process.cwd(),
    describe: 'working directory to use',
    type: 'string'
  }
})

const commandsList = {
  create: {
    command: 'create [<directory>]',
    aliases: ['new'],
    describe: 'Create a new project'
  },

  pdf: {
    command: 'pdf',
    describe: 'Converts the presentation to PDF',
    requireProject: true
  },

  serve: {
    command: 'serve',
    describe: 'Serve the presentation in development mode',
    requireProject: true
  },

  prepare: {
    command: 'prepare',
    describe: 'Gather the necessary files in a separate folder',
    requireProject: true
  },

  archive: {
    command: 'archive',
    describe: 'Create an archive of the presentation',
    requireProject: true
  },

  publish: {
    command: 'publish',
    describe: 'Publish your presentation to GitHub Pages',
    requireProject: true
  }
}

app.middleware((argv, app) => {
  argv.project = getEnv(argv.cwd)

  const name = argv._[0]

  if (commandsList[name].requireProject && !argv.project) {
    process.stdout.write(
      chalk`{red Shower presentation not found}\n\n` +
      chalk`Use {yellow shower create} to create a presentation\n` +
      chalk`Run {yellow shower create --help} to learn more\n`
    )

    app.exit(1)
  }
})

function lazyLoadCommand (id) {
  const command = commandsList[id]

  return {
    command: command.command,
    aliases: command.aliases,
    describe: chalk.yellow(command.describe),

    builder (...args) {
      const { builder } = require(`./command/${id}.js`)

      return builder.call(this, ...args)
    },

    async handler (options) {
      const { handler, messages } = require(`./command/${id}.js`)
      const { start, end } = messages(options)

      if (start) {
        await (new Listr([
          {
            title: start,
            task: () => handler(options)
          }
        ])).run()
      } else {
        await handler(options)
      }

      if (end) {
        process.stdout.write(chalk`${end} 🎉\n`)
      }
    }
  }
}

for (const commandID in commandsList) {
  app.command(lazyLoadCommand(commandID))
}

app.argv // eslint-disable-line no-unused-expressions

if (!process.argv.slice(2).length) {
  app.showHelp()
}

process.on('uncaughtException', (error) => {
  console.error(error)

  process.exit(1)
})

process.on('SIGINT', () => {
  console.log(chalk.red('\nAborted'))

  process.exit(0)
})
