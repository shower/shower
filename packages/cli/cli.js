#!/usr/bin/env node

const ShowerCLI = require('./');

const command = process.argv[2];
const app = new ShowerCLI(process.env.PWD);

if (command === undefined) {
  console.error('Required task name');
} else if (typeof app[command] !== 'function') {
  console.error(`Unknown task "${command}"`);
} else {
  app[command]();
}
