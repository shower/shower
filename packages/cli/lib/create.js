const path = require('path')

const unzip = require('./utils/unzip')
const remove = require('./utils/remove')
const download = require('./utils/download')

module.exports = function create ({ root }, { url }) {
  console.log('Run to create new project\n')

  const archive = path.join(root, 'shower.zip')

  return Promise.resolve()
    .then(() => {
      console.log(`-- Download template...`)
      return download({ url, destination: archive })
    })
    .then(() => {
      console.log(`-- Unzip...`)
      return unzip({ file: archive, destination: root })
    })
    .then(() => {
      console.log(`-- Clear...`)
      return remove({ file: archive })
    })
}
