const execa = require('execa')

/**
 * Install node modules synchronously and save to dependencies in package.json
 * @param {string} cwd cwd dir
 * @param {string|string[]} packages Node module or modules to install
 * @param {string} mode Type package installing
 * @returns {void}
 */
module.exports.installDependencies = async function installDevDependencies (cwd, packages, mode = 'save') {
  packages = Array.isArray(packages) ? packages : [packages]

  try {
    return await execa('npm', ['i', '--package-lock', `--${mode}`].concat(packages), { cwd })
  } catch (error) {
    if (error.code === 'ENOENT') {
      const pluralS = packages.length > 1 ? 's' : ''

      console.error(`Could not execute npm. Please install the following package${pluralS} with a package manager of your choice: ${packages.join(', ')}`)
    } else {
      throw error
    }
  }
}
