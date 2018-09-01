const chalk = require('chalk')
const Listr = require('listr')

/**
 * Apply CLI command
 *
 * @param {ProjectConfig} config
 * @param {Object} command
 * @param {Object} options
 * @return {Promise<void>}
 */
async function applyCommand (config, command, options) {
  const name = command.command.split(' ')[0]

  const task = require(`../command/${name}.js`)

  let { messages = {}, config: taskConfig = {} } = task

  if (typeof messages === 'function') {
    messages = messages(config, options)
  }

  if (taskConfig.requiredExistingPresentation && !config.project) {
    process.stdout.write(
      chalk`{red Shower presentation not found}\n\n` +
      chalk`Use {yellow shower create} to create a presentation\n` +
      chalk`Run {yellow shower create --help} to learn more\n`
    )

    return
  }

  const s = Date.now()

  if (messages.start) {
    await (new Listr([
      {
        title: messages.start,
        task: () => task(config, options)
      }
    ])).run()
  } else {
    await task(config, options)
  }

  const time = ((Date.now() - s) / 1000).toFixed()

  if (messages.end) {
    process.stdout.write(chalk`\n ${messages.end} 🎉 {yellow [in ${time}s]}\n`)
  }

  process.exitCode = 0
}

const list = {
  create: {
    meta: '[<directory>]',
    describe: 'Create a new project',
    builder: yargs => yargs
      .positional('directory', {
        default: 'slides'
      })
  },

  pdf: {
    describe: 'Converts the presentation to PDF',
    builder: yargs => yargs.options({
      'output': {
        alias: 'o', type: 'string', default: 'presentation.pdf', describe: 'File name'
      }
    })
  },

  serve: {
    describe: 'Serve a the presentation in development mode',
    builder: yargs => yargs.options({
      open: {
        alias: 'o', type: 'bool', default: false, describe: 'Open browser'
      },
      port: {
        alias: 'p', type: 'number', default: 8080, describe: 'Listening Port'
      },
      ui: {
        type: 'bool',
        default: false,
        describe: 'Whether to run BrowserSync UI'
      },
      notify: {
        type: 'bool', default: false, describe: 'Whether to show BrowserSync notifications'
      }
    })
  },

  prepare: {
    describe: 'Prepare the project',
    builder: yargs => yargs.options({
      output: {
        alias: 'o', type: 'string', default: 'prepared', describe: 'In which folder will the prepared presentation be written'
      },
      files: {
        alias: 'f', array: true, type: 'string', describe: 'List of files that will get the build'
      }
    })
  },

  archive: {
    describe: 'Archive the project',
    builder: yargs => yargs.options({
      output: {
        alias: 'o', type: 'string', default: 'archive.zip', describe: 'Archive name'
      },
      files: {
        alias: 'f', array: true, type: 'string', describe: 'List of files that will get the build'
      }
    })
  },

  publish: {
    describe: 'Publish the presentation to gh-pages',
    builder: yargs => yargs.options({
      files: {
        alias: 'f', array: true, type: 'string', describe: 'List of files that will get the build'
      }
    })
  }
}

module.exports = { list, apply: applyCommand }
