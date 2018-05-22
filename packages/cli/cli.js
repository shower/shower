#!/usr/bin/env node

const app = require('yargs')
const chalk = require('chalk')
const semver = require('semver')
const signale = require('signale')

const { engines, version } = require('./package.json')

if (!semver.satisfies(process.version, engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${ process.version },` +
      `but this version of vue-cli requires Node ${ engines.node }.\n` +
      `Please upgrade your Node version.`
    )
  )

  process.exit(1)
}

app
  .locale('en')
  .version(version)
  .usage('Usage: $0 <command> [-h, --help] [-v, --version] [...options]')

const commands = [
  {
    command: 'create',
    describe: 'Create a new project',
    builder: yargs => yargs.options({
      url: {
        alias: 'u',
        type: 'string',
        default: 'http://shwr.me/shower.zip',
        describe: 'URL to the archive with the template'
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
    command: 'pdf',
    describe: 'Converts the presentation to PDF',
    builder: yargs => yargs.options({
      file: {
        alias: 'f',
        type: 'string',
        default: 'presentation.pdf',
        describe: 'File name'
      }
    })
  }
]

const config = {
  root: process.env.PWD
}

for (const command of commands) {
  const { command: name } = command

  const lib = require(`./lib/${ name }.js`)

  app.command(Object.assign(command, {
    handler (options) {
      const s = Date.now()

      let messages = lib.messages

      if (typeof messages === 'function') {
        messages = messages(config, options)
      }

      signale.pending(messages.start)

      return lib(config, options)
        .then(() => {
          const time = ((Date.now() - s) / 1000).toFixed()

          signale.success({
            message: messages.end,
            suffix: chalk.yellow(`[in ${ time }s]`)
          })
        })
        .catch(error => {
          signale.fatal(error)
        })
    },
    describe: `\b- ${ command.describe }`
  }))
}

// add some useful info on help
app.epilog(
  `Run ${ chalk.cyan(`$0 <command> -h`) } for detailed usage of given command`
)

app
  .alias('help', 'h')
  .alias('version', 'v')

app.strict()

app.argv // eslint-disable-line no-unused-expressions

if (!process.argv.slice(2).length) {
  app.showHelp()
}
