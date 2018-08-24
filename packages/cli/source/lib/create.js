const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const { installDependencies } = require('../utils/npm')

const files = [
  {
    name: 'package.json',
    render: ({ name }) => `
{
  "name": "${name}",
  "dependencies": {}
}
    `
  },
  {
    name: 'index.html',
    render: ({ name, ratio, theme }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${name}</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="node_modules/shower-${theme}/styles/styles.css">

    <style>
      .shower {
        --slide-ratio: calc(${ratio});
      }
    </style>
  </head>

  <body class="shower list">
    <header class="caption">
      <h1>Shower Presentation Engine</h1>
      <p>Yours Truly, Famous Inc.</p>
    </header>

    <section class="slide">
      <!-- Create your first slide -->
    </section>

    <footer class="badge">
      <a href="https://github.com/shower/shower">Fork me on GitHub</a>
    </footer>

    <div class="progress"></div>

    <script src="node_modules/shower-core/shower.min.js"></script>
    <!-- Copyright © ${(new Date()).getFullYear()} Yours Truly, Famous Inc. -->
  </body>
</html>
    `
  }
]

function create ({ root }, { directory = 'slides' }) {
  const options = {
    name: 'slides',
    ratio: '16 / 9',
    theme: 'ribbon'
  }

  if (path.isAbsolute(directory)) {
    directory = path.join(root, directory)
  }

  return Promise.resolve()
    // 1. Create new folder
    .then(() => promisify(fs.mkdir)(directory))

    // 2. Create 'index.html'and 'package.json'
    .then(() => Promise.all(files.map(({ name, render }) => {
      const filePath = path.join(directory, name)
      const value = render(options).trim()

      return promisify(fs.writeFile)(filePath, value)
    })))

    // 3. Install dependencies
    .then(() => installDependencies(directory, ['shower-core', 'shower-material', 'shower-ribbon']))
}

create.messages = {
  start: 'Creating new project in progress',
  end: 'Project created'
}

module.exports = create
