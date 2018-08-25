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
    process.stdout.write(`\n ${messages.end} 🎉 ${chalk.yellow(`[in ${time}s]`)}\n`)
  }

  process.exitCode = 0
}

module.exports = applyCommand
