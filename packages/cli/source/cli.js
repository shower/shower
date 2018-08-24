#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')

const { engines } = require('../package.json')

if (!semver.satisfies(process.version, engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${process.version},` +
      `but this version of shower-cli requires Node ${engines.node}.\n` +
      `Please upgrade your Node version.`
    )
  )

  process.exit(1)
}

const setup = require('./core/setup_cli')

// If the node version is supported, setup CLI
setup()
  .catch(console.error)
