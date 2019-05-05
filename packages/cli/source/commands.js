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
  const messages = task.messages(env, options)

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
    aliases: ['new'],
    meta: '[<directory>]',
    describe: 'Create a new project',
    builder: yargs => yargs
      .options({
        yes: {
          alias: ['y'],
          default: false,
          type: 'boolean'
        }
      })
      .positional('directory', {
        default: 'slides'
      })
  },

  pdf: {
    describe: 'Converts the presentation to PDF',
    usesExistingPresentation: true,
    builder: yargs => yargs
      .options({
        output: {
          alias: 'o',
          type: 'string',
          default: 'index.pdf',
          describe: 'File name'
        }
      })
  },

  serve: {
    describe: 'Serve the presentation in development mode',
    usesExistingPresentation: true,
    builder: yargs => yargs
      .options({
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
        },
        ui: {
          type: 'bool',
          default: false,
          describe: 'Whether to run BrowserSync UI'
        },
        notify: {
          type: 'bool',
          default: false,
          describe: 'Whether to show BrowserSync notifications'
        }
      })
  },

  prepare: {
    describe: 'Gather the necessary files in a separate folder',
    usesExistingPresentation: true,
    builder: yargs => yargs
      .options({
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

  archive: {
    describe: 'Create an archive of the presentation',
    usesExistingPresentation: true,
    builder: yargs => yargs
      .options({
        output: {
          alias: 'o',
          type: 'string',
          default: 'presentation.zip',
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

  publish: {
    describe: 'Publish your presentation to GitHub Pages',
    usesExistingPresentation: true,
    builder: yargs => yargs
      .options({
        files: {
          alias: 'f',
          array: true,
          type: 'string',
          describe: 'List of files that will get the build'
        }
      })
  }
}

module.exports = { list, apply: applyCommand }
