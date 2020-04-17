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

function getThemeFiles (theme) {
  return vfs.src([
    '**', '!package.json'
  ], {
    cwd: `node_modules/@shower/${theme}`
  })
    .pipe(rename((path) => {
      path.dirname = `shower/themes/${theme}/${path.dirname}`
    }))
}

function loadPresentationFiles (files = defaultFiles) {
  const presentations = vfs.src(files)
    .pipe(replace(
      /(<link rel="stylesheet" href=")(node_modules\/@shower\/)([^/]*)\/(.*\.css">)/g,
      '$1shower/themes/$3/$4', { skipBinary: true }
    ))
    .pipe(replace(
      /(<script src=")(node_modules\/@shower\/core\/dist\/)(shower.js"><\/script>)/g,
      '$1shower/$3', { skipBinary: true }
    ))

  const core = vfs.src([
    'shower.js'
  ], {
    cwd: 'node_modules/@shower/core/dist'
  })
    .pipe(rename((path) => {
      path.dirname = 'shower/' + path.dirname
    }))

  return merge(presentations, core, getThemeFiles('material'), getThemeFiles('ribbon'))
}

module.exports = { loadPresentationFiles }
