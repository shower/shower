'use strict';

const resolve = require('rollup-plugin-node-resolve');
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
`;

module.exports = {
    entry: 'lib/index.js',
    plugins: [
        resolve(),
    ],
    format: 'iife',
    moduleName: 'shower',
    banner,
    dest: 'dist/shower.js',
};
