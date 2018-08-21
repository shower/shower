const fs = require('fs')

module.exports = fs.readdirSync('./lib')
  .filter(file => /\.js$/i.test(file))
  .map(name => name.replace(/\.js$/, ''))
  .reduce((libs, libName) => {
    const lib = require(`./lib/${libName}`)

    return Object.assign(libs, { [libName]: lib })
  }, {})
