#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const semver = require('semver');

const { engines, version } = require('./package.json');

if (!semver.satisfies(process.version, engines.node)) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}, but this version of vue-cli requires Node ${engines.node}.\n` +
      `Please upgrade your Node version.`
    )
  );

  process.exit(1)
}

const libs = require('./');

yargs
  .locale('en')
  .version(version)
  .usage('Usage: $0 <command> [-h, --help] [-v, --version] [...options]');

const commands = [
  {
    command: 'create',
    describe: 'Create a new project',
  },

  {
    command: 'serve',
    describe: 'Serve a the presentation in development mode',
    builder: yargs => yargs.options({
      open: {
        alias: 'o',
        default: false,
        describe: 'Open browser',
      },
      port: {
        alias: 'p',
        type: 'number',
        default: 8080,
        describe: 'Listening Port'
      },
    }),
  },

  {
    command: 'pdf',
    describe: 'Converts the presentation to PDF',
  },
];

for (let command of commands) {
  const { command: name } = command;

  yargs.command(Object.assign(command, {
    handler: command.handler || libs[name],
    describe: `\b- ${command.describe}`,
  }));
}

// add some useful info on help
yargs.epilog(`Run ${chalk.cyan(`$0 <command> --help`)} for detailed usage of given command`);

yargs
  .alias('help', 'h')
  .alias('version', 'v');

yargs.strict();

yargs.argv;

if (!process.argv.slice(2).length) {
  yargs.showHelp();
}
