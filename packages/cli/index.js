const opn = require('opn');
const path = require('path');
const puppeteer = require('puppeteer');
const { createServer } = require('http');
const { Server: StaticServer } = require('node-static');

const utils = require('./utils');

const ROOT = process.env.PWD;

module.export = {
  async pdf() {
    const fileName = 'presentation.pdf';

    console.log('Run to create pdf');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`file://${ROOT}/index.html`);

    await page.pdf({ path: fileName, width: '960px', height: '600px' });

    browser.close();
  },

  async create() {
    const template = 'http://shwr.me/shower.zip';

    console.log('Run to create new project\n');

    const archive = path.join(ROOT, 'shower.zip');

    console.log(`-- Download template...`);
    await utils.download({ url: template, destination: archive }); // Download

    console.log(`-- Unzip...`);
    await utils.unzip({ file: archive, destination: ROOT }); // Unzip

    console.log(`-- Clear...`);
    await utils.remove({ file: archive }); // Remove archive
  },

  serve(options) {
    const port = options.port || 8080;

    return new Promise((resolve, reject) => {
      const server = new StaticServer(ROOT);

      const app = createServer((request, response) => {
        request.addListener('end', () => {
          server.serve(request, response);
        }).resume();
      });

      app.on('error', reject);

      app.listen(port, (error) => {
        if (error) {
          reject(error);
        }

        if (options.open) {
          opn(`http://localhost:${port}`);
        }

        console.log(`Server listening "${port}" port...`);
      });
    });
  },
};
