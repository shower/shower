const fs = require('fs')
const { join } = require('path')

module.exports = fs.readdirSync(join(__dirname, './command'))
  .reduce((libs, file) => {
    if (!/\.js$/i.test(file)) {
      return libs
    }

    return Object.assign(libs, {
      [file.replace(/\.js$/, '')]: require(`./command/${file}`)
    })
  }, {})
