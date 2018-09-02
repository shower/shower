#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')

const pkg = require('../package.json')

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${chalk.bold(pkg.process.version)},` +
      `but this version of shower-cli requires Node ${chalk.bold(pkg.engines.node)}.\n` +
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

async function setup () {
  app.strict()
  app.locale('en')
  app.version(pkg.version)
  app.usage(chalk`Usage: {bold $0 [--version] [--help] <command> [<args>]}`)
  app.epilog(chalk`See {bold $0 <command> --help} to read about a specific subcommand.`)

  const env = getEnv()

  for (const name in list) {
    if (!list.hasOwnProperty(name)) {
      return
    }

    let command = list[name]

    app.command({
      command: command.meta ? `${name} ${command.meta}` : name,
      describe: chalk.yellow(command.describe),
      builder: command.builder,
      handler: (options) => {
        if (command.usesExistingPresentation && !env.project) {
          process.stdout.write(
            chalk`{red Shower presentation not found}\n\n` +
            chalk`Use {yellow shower create} to create a presentation\n` +
            chalk`Run {yellow shower create --help} to learn more\n`
          )

          return Promise.resolve()
        }

        return apply(name, env, options)
      }
    })
  }

  app.argv // eslint-disable-line no-unused-expressions

  if (!process.argv.slice(2).length) {
    app.showHelp()
  }
}

// If the node version is supported, setup CLI
setup()
  .then(() => {
    process.exitCode = 0
  })
  .catch(error => {
    console.error(error)

    process.exitCode = 1
  })

process.on('SIGINT', () => {
  console.log(chalk.red('\nAborted'))

  process.exit(0)
})
