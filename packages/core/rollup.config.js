'use strict';

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const pkg = require('./package.json');

const ndash = '\u2013';
const now = new Date().getFullYear();
const banner = `
/**
 * ${pkg.description}
 * ${pkg.name} v${pkg.version}, ${pkg.homepage}
 * @copyright 2010${ndash}${now} ${pkg.author.name}, ${pkg.author.url}
 * @license ${pkg.license}
 */
`.trim();

module.exports = {
    input: 'lib/index.js',
    output: {
        file: 'dist/shower.js',
        format: 'iife',
        name: 'shower',
        banner,
    },
    plugins: [resolve(), commonjs()],
};
