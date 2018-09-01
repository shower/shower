const fs = require('fs')
const { resolve } = require('path')

/**
 * @typedef {Object} ProjectConfig
 * @property {string} project.path – Found an project
 */

/**
 * @typedef {Object} AppConfig
 * @property {string} cwd – Path to the current project folder
 * @property {ProjectConfig|null} project – Existing project config
 */

/**
 * Creates a application config
 *
 * @param {string=$PWD} cwd – The directory from which the script is run
 *
 * @returns {AppConfig} – application config
 */
function getEnv (cwd = process.cwd()) {
  let project = null

  for (let path = cwd; path !== (process.env.HOME || '/');) {
    if (fs.existsSync(resolve(path, 'index.html'))) {
      project = { path }

      break
    }

    path = resolve(path, '..')
  }

  return {
    cwd,
    project
  }
}

module.exports = { getEnv }
