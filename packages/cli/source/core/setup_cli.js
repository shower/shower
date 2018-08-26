const app = require('yargs')
const chalk = require('chalk')

const { version } = require('../../package.json')

const loadConfig = require('./load_config')
const applyTask = require('./apply_command')

const commands = [
  {
    command: 'create [<directory>]',
    describe: 'Create a new project',
    builder: yargs => yargs
      .positional('directory', {})
  },

  {
    command: 'archive [<file>]',
    describe: 'Archive the project',
    builder: yargs => yargs.options({
      output: {
        alias: 'o',
        type: 'string',
        default: 'archive.zip',
        describe: 'Archive name'
      },
      files: {
        alias: 'f',
        array: true,
        type: 'string',
        describe: 'List of files that will get the build'
      }
    })
  },

  {
    command: 'prepare',
    describe: 'Prepare the project',
    builder: yargs => yargs.options({
      output: {
        alias: 'o',
        type: 'string',
        default: 'prepared',
        describe: 'In which folder will the prepared presentation be written'
      },
      files: {
        alias: 'f',
        array: true,
        type: 'string',
        describe: 'List of files that will get the build'
      }
    })
  },

  {
    command: 'serve',
    describe: 'Serve a the presentation in development mode',
    builder: yargs => yargs.options({
      open: {
        alias: 'o',
        type: 'bool',
        default: false,
        describe: 'Open browser'
      },
      port: {
        alias: 'p',
        type: 'number',
        default: 8080,
        describe: 'Listening Port'
      }
    })
  },

  {
    command: 'publish',
    describe: 'Publish the presentation to gh-pages',
    builder: yargs => yargs.options({
      files: {
        alias: 'f',
        array: true,
        type: 'string',
        describe: 'List of files that will get the build'
      }
    })
  },

  {
    command: 'pdf [<file>]',
    describe: 'Converts the presentation to PDF',
    builder: yargs => yargs.options({
      'output': {
        alias: 'o',
        type: 'string',
        default: 'presentation.pdf',
        describe: 'File name'
      }
    })
  }
]

module.exports = async function setupCLI () {
  app
    .locale('en')
    .version(version)
    .usage('Usage: ' + chalk.cyan('$0 [--version] [--help] <command> [<args>]'))

  const config = await loadConfig()

  for (const command of commands) {
    const describe = `\b- ${chalk.yellow(command.describe)}`
    const handler = (options) => applyTask(config, command, options)

    app.command(Object.assign({}, command, { describe, handler }))
  }

  // add some useful info on help
  app.epilog(
    `See ` +
    chalk.cyan('$0 <command> --help') +
    ' to read about a specific subcommand.'
  )

  app.strict()

  app.argv // eslint-disable-line no-unused-expressions

  if (!process.argv.slice(2).length) {
    app.showHelp()
  }
}
