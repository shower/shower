#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')

const pkg = require('../package.json')

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${chalk.bold(process.version)}, ` +
      `but this version of ${chalk.bold(pkg.name)} requires Node ${chalk.bold(pkg.engines.node)}.\n` +
      `Please upgrade your Node version.`
    )
  )

  process.exit(1)
}

const app = require('yargs')
const updateNotifier = require('update-notifier')

// Warn the user about new versions
updateNotifier({ pkg }).notify()

const { getEnv } = require('./lib/env')
const { list, apply } = require('./commands')

app.strict()
app.locale('en')
app.version(pkg.version)
app.usage(chalk`Usage: {bold $0 [--version] [--help] <command> [<args>]}`)
app.epilog(chalk`See {bold $0 <command> --help} to read about a specific subcommand.`)

app.alias('h', 'help')
app.alias('v', 'version')

const env = getEnv()

const COMMANDS_REQUIRE_EXISTING_PRESENTATION = [
  'pdf', 'serve', 'prepare', 'archive', 'publish'
]

app.middleware((argv, app) => {
  const name = argv._[0]

  if (COMMANDS_REQUIRE_EXISTING_PRESENTATION.includes(name) && !env.project) {
    process.stdout.write(
      chalk`{red Shower presentation not found}\n\n` +
      chalk`Use {yellow shower create} to create a presentation\n` +
      chalk`Run {yellow shower create --help} to learn more\n`
    )

    app.exit(1)
  }
})

for (const command of list) {
  const name = command.command.split(' ')[0]

  app.command({
    command: command.command,
    aliases: command.aliases,
    describe: chalk.yellow(command.describe),
    builder: command.builder,
    handler: apply.bind(null, name, env)
  })
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
