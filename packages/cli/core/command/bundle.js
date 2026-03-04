import vfs from 'vinyl-fs'
import chalk from 'chalk'
import path from 'node:path'
import { deleteSync } from 'del'

import { loadPresentationFiles } from '../lib/presentation.js'

function handler ({ cwd, output, files }) {
  if (!path.isAbsolute(output)) {
    output = path.join(cwd, output)
  }

  deleteSync([output])

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
        default: 'bundled',
        describe: 'In which folder will the bundled presentation be written'
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
    start: 'Project bundling in progress',
    end: chalk`Project bundled in {bold ${output}} dir`
  }
}

export { handler, builder, messages }
