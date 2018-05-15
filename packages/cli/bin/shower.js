#!/usr/bin/env node

const command = process.argv[2];

const state = {
  root: process.env.PWD,
};

if (command !== undefined) {
  try {
    const task = require(`../lib/${command}`);

    task(state);
  } catch (_) {
    console.error(`Unknow task "${command}"`);
  }
} else {
  console.error('Required task name');
}
