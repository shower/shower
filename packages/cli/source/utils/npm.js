const spawn = require('cross-spawn')

/**
 * Install node modules synchronously and save to dependencies in package.json
 * @param {string} cwd Root dir
 * @param {string|string[]} packages Node module or modules to install
 * @returns {void}
 */
module.exports.installDependencies = function installDevDependencies (cwd, packages) {
  packages = Array.isArray(packages) ? packages : [packages]
  const { error } = spawn.sync('npm', ['i', '--save'].concat(packages), { cwd, stdio: 'inherit' })

  if (error && error.code === 'ENOENT') {
    const pluralS = packages.length > 1 ? 's' : ''

    console.error(`Could not execute npm. Please install the following package${pluralS} with a package manager of your choice: ${packages.join(', ')}`)
  }
}
