const fs = require('fs')

const l = fs.readdirSync('./lib')
  .filter(file => /\.js$/i.test(file))
  .map(name => name.replace(/\.js$/, ''))
  .reduce((libs, libName) => {
    const lib = require(`./lib/${ libName }`)

    return Object.assign(libs, { [libName]: lib })
  }, {})

console.log(l)
