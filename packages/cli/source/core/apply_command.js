const chalk = require('chalk')
const signale = require('signale')

/**
 * Apply CLI command
 *
 * @param {ProjectConfig} config
 * @param {Object} command
 * @param {Object} options
 * @return {Promise<void>}
 */
module.exports = async function applyCommand (config, command, options) {
  const name = command.command.split(' ')[0]

  const task = require(`../command/${name}.js`)

  if (command.requiredPresentation && !config.project) {
    signale.fatal('Shower presentation not found')

    return
  }

  const s = Date.now()

  let messages = task.messages || {}

  if (typeof messages === 'function') {
    messages = messages(config, options)
  }

  if (messages.start) {
    signale.pending(messages.start)
  }

  try {
    await task(config, options)

    const time = ((Date.now() - s) / 1000).toFixed()

    if (messages.end) {
      signale.success({
        message: messages.end,
        suffix: chalk.yellow(`[in ${time}s]`)
      })
    }

    process.exitCode = 0
  } catch (error) {
    signale.fatal(error)

    process.exitCode = 1
  }
}
