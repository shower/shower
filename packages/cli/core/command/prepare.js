const vfs = require('vinyl-fs')
const chalk = require('chalk')
const path = require('path')
const del = require('del')

const { loadPresentationFiles } = require('../lib/presentation')

function handler ({ cwd, output, files }) {
  if (!path.isAbsolute(output)) {
    output = path.join(cwd, output)
  }

  del.sync([output])

  const stream = loadPresentationFiles(files)
    .pipe(vfs.dest(output))

  return new Promise((resolve, reject) => {
    stream
      .on('end', resolve)
      .on('error', reject)
  })
}

function builder (yargs) {
  return yargs
    .options({
      output: {
        alias: 'o',
        type: 'string',
        default: 'prepared',
        describe: 'In which folder will the prepared presentation be written'
      },
      files: {
        alias: 'f',
        array: true,
        type: 'string',
        describe: 'List of files that will get the build'
      }
    })
}

function messages ({ output }) {
  return {
    start: 'Project preparation in progress',
    end: chalk`Project prepared in {bold ${output}} dir`
  }
}

module.exports = { handler, builder, messages }
