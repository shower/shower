const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

/**
 * @typedef {Object} ProjectConfig
 * @property {string} project.path – Found an project
 */

/**
 * @typedef {Object} AppConfig
 * @property {string} root – Path to the current project folder
 * @property {ProjectConfig|null} project – Existing project config
 */

/**
 * Checks if the 'path' directory is a shower project
 *
 * @param {string} path
 * @return {Promise<boolean>}
 */
async function isShowerProjectRoot (path) {
  try {
    return (await promisify(fs.stat)(resolve(path, 'index.html'))).isFile()
  } catch (_) {}

  return false
}

/**
 * Find shower project
 * @async
 * @private
 *
 * @param {string} path – the directory from which the script is run
 *
 * @return {string|null} – path to shower project if project exists else null
 */
async function findExistProject (path) {
  do {
    if (await isShowerProjectRoot(path)) {
      return { path }
    }

    path = resolve(path, '..')
  } while (path !== (process.env.HOME || '/'))

  return null
}

/**
 * Creates a application config
 *
 * @returns {AppConfig}
 */
async function loadConfig () {
  const root = process.env.PWD
  const project = await findExistProject(root)

  return {
    root,
    project
  }
}

module.exports = loadConfig
