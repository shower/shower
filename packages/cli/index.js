const fs = require('fs');
const util = require('util');
const path = require('path');
const puppeteer = require('puppeteer');
const { createServer } = require('http');
const { Server: StaticServer } = require('node-static');

const utils = require('./utils');

class ShowerCLI {
  constructor(root) {
    this.root = root;

    this.config = {
      port: 8080,
      pdfFile: 'presentation.pdf',
      templateURL: 'http://shwr.me/shower.zip',
    };
  }

  async pdf() {
    console.log('Run to create pdf');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`file://${this.root}/index.html`);

    await page.pdf({ path: this.config.pdfFile, width: '960px', height: '600px' });

    browser.close();
  }

  async new() {
    console.log('Run to create new project\n');

    const archive = path.join(this.root, 'shower.zip');

    console.log(`-- Download template...`);
    await utils.download({ url: this.config.templateURL, destination: archive }); // Download

    console.log(`-- Unzip...`);
    await utils.unzip({ file: archive, destination: this.root }); // Unzip

    console.log(`-- Clear...`);
    await utils.remove({ file: archive }); // Remove archive
  }

  serve() {
    return new Promise((resolve, reject) => {
      const server = new StaticServer(this.root);

      const app = createServer((request, response) => {
        request.addListener('end', () => {
          server.serve(request, response);
        }).resume();
      });

      app.on('error', reject);

      app.listen(this.config.port, (error) => {
        if (error) {
          reject(error);
        }

        console.log(`Server listening "${this.config.port}" port...`);
      });
    });
  }
}

module.exports = ShowerCLI;
