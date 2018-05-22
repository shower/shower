const download = require('download')

function create ({ root }, { url, directory = root }) {
  return download(url, directory, { extract: true })
}

create.messages = {
  start: 'Creating new project in progress',
  end: 'Project created'
}

module.exports = create
