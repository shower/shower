const fs = require('fs')

module.exports.isExist = function isExist (dir) {
  try {
    fs.statSync(dir)
  } catch (e) {
    return false
  }

  return true
}
