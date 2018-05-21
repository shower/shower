const fs = require('fs');
const path = require('path');
const yauzl = require('yauzl');
const wget = require('node-wget');
const { promisify } = require('util');

module.exports.download = ({ url, destination }) => new Promise((resolve, reject) => {
  wget({ url, dest: destination }, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

const mkdirp = (dir) => new Promise((resolve) => {
  if (dir === ".") {
    return resolve();
  }

  fs.stat(dir, (error) => {
    if (error === null) { // already exists
      return resolve();
    }

    mkdirp(path.dirname(dir)).then(() => fs.mkdir(dir, resolve));
  });
});

module.exports.unzip = ({ file, destination }) => new Promise((resolve, reject) => {
  yauzl.open(file, { lazyEntries: true }, (error, zipfile) => {
    if (error) {
      return reject(error)
    }

    zipfile.readEntry();

    zipfile.on('end', resolve);
    zipfile.on('error', reject);
    zipfile.on('close', resolve);

    zipfile.on('entry', (entry) => {
      if (/\/$/.test(entry.fileName)) {
        mkdirp(entry.fileName)
          .then(() => zipfile.readEntry())
          .catch(reject);
      } else {
        const file = fs.createWriteStream(entry.fileName);

        zipfile.openReadStream(entry, (error, readStream) => {
          if (error) {
            return reject(error);
          }

          readStream.on('error', reject);
          readStream.on('end', () => zipfile.readEntry());

          readStream.pipe(file);
        });
      }
    });
  });
});

module.exports.remove = ({ file }) => promisify(fs.unlink)(file);
