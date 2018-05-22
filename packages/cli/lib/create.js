const download = require('download')

function create ({ root }, { url }) {
  return download(url, root, { extract: true })
}

create.messages = {
  start: 'Creating new project in progress',
  end: 'Project created'
}

module.exports = create
