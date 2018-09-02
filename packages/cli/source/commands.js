const Listr = require('listr')
const chalk = require('chalk')

/**
 * Apply CLI command
 *
 * @param {string} name
 * @param {ProjectConfig} env
 * @param {Object} options
 *
 * @return {Promise<void>}
 */
async function applyCommand (name, env, options) {
  const s = Date.now()

  const task = require(`./command/${name}.js`)

  let { messages = {} } = task
  if (typeof task.messages === 'function') {
    messages = typeof task.messages === 'function' ? task.messages(env, options) : task.messages
  }

  if (messages.start) {
    await (new Listr([
      {
        title: messages.start,
        task: () => task(env, options)
      }
    ])).run()
  } else {
    await task(env, options)
  }

  if (messages.end) {
    const time = ((Date.now() - s) / 1000).toFixed()

    process.stdout.write(chalk`${messages.end} 🎉 {yellow [in ${time}s]}\n`)
  }
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
    usesExistingPresentation: true,
    builder: yargs => yargs.options({
      'output': {
        alias: 'o', type: 'string', default: 'presentation.pdf', describe: 'File name'
      }
    })
  },

  serve: {
    describe: 'Serve a the presentation in development mode',
    usesExistingPresentation: true,
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
    usesExistingPresentation: true,
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
    usesExistingPresentation: true,
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
    usesExistingPresentation: true,
    builder: yargs => yargs.options({
      files: {
        alias: 'f', array: true, type: 'string', describe: 'List of files that will get the build'
      }
    })
  }
}

module.exports = { list, apply: applyCommand }
