const vfs = require('vinyl-fs')
const merge = require('merge-stream')
const rename = require('gulp-rename')
const replace = require('gulp-replace')

const defaultFiles = [
  '**',
  '!node_modules{,/**}',
  '!prepared{,/**}',
  '!package.json',
  '!package-lock.json'
]

function loadPresentationFiles (files = defaultFiles) {
  const shower = vfs.src(files)
    .pipe(replace(
      /(<link rel="stylesheet" href=")(node_modules\/shower-)([^/]*)\/(.*\.css">)/g,
      '$1shower/themes/$3/$4', { skipBinary: true }
    ))
    .pipe(replace(
      /(<script src=")(node_modules\/shower-core\/)(shower.min.js"><\/script>)/g,
      '$1shower/$3', { skipBinary: true }
    ))

  const core = vfs.src([
    'shower.min.js'
  ], {
    cwd: 'node_modules/shower-lib'
  })
    .pipe(rename((path) => {
      path.dirname = 'shower/' + path.dirname
    }))

  const material = vfs.src([
    '**', '!package.json'
  ], {
    cwd: 'node_modules/shower-material'
  })
    .pipe(rename((path) => {
      path.dirname = 'shower/themes/material/' + path.dirname
    }))

  const ribbon = vfs.src([
    '**', '!package.json'
  ], {
    cwd: 'node_modules/shower-ribbon'
  })
    .pipe(rename((path) => {
      path.dirname = 'shower/themes/ribbon/' + path.dirname
    }))

  const themes = merge(material, ribbon)
    .pipe(replace(
      /(<script src=")(\/shower-core\/)(shower.min.js"><\/script>)/,
      '$1../../$3', { skipBinary: true }
    ))

  return merge(shower, core, themes)
}

module.exports = { loadPresentationFiles }
