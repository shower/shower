const fs = require('fs')
const { join } = require('path')

module.exports = fs.readdirSync(join(__dirname, './lib'))
  .filter(file => /\.js$/i.test(file))
  .map(name => name.replace(/\.js$/, ''))
  .reduce((libs, libName) => {
    const lib = require(`./lib/${libName}`)

    return Object.assign(libs, { [libName]: lib })
  }, {})
