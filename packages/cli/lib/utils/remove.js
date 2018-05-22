const fs = require('fs')
const { promisify } = require('util')

module.exports = function remove ({ file }) {
  return promisify(fs.unlink)(file)
}
