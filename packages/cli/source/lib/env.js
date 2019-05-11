const fs = require('fs')
const { resolve } = require('path')

/**
 * @typedef {Object} ProjectConfig
 * @property {string} project.path – Found an project
 */

/**
 * Creates a application config
 *
 * @param {string} cwd – The directory from which the script is run
 *
 * @returns {ProjectConfig} – project config
 */
function findProject (cwd) {
  let project = null

  for (let path = cwd; path !== (process.env.HOME || '/');) {
    if (fs.existsSync(resolve(path, 'index.html'))) {
      project = { path }

      break
    }

    path = resolve(path, '..')
  }

  return project
}

module.exports = { getEnv: findProject }
