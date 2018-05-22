const download = require('download')

module.exports = function create ({ root }, { url }) {
  console.log('Run to create new project\n')

  return download(url, root, { extract: true })
}
