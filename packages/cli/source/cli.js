#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${pkg.process.version},` +
      `but this version of shower-cli requires Node ${pkg.engines.node}.\n` +
      `Please upgrade your Node version.`
    )
  )

  process.exit(1)
}

// Warn the user about new versions
updateNotifier({ pkg }).notify()

process.on('SIGINT', () => {
  console.log('\nAborted')

  process.exit(0)
})

const setup = require('./core/setup_cli')

// If the node version is supported, setup CLI
setup()
  .catch(console.error)
