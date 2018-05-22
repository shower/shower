const wget = require('node-wget')

module.exports = function download ({ url, destination }) {
  return new Promise((resolve, reject) => {
    wget({ url, dest: destination }, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
