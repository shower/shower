'use strict';

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const pkg = require('./package.json');

const ndash = '\u2013';
const yearNow = new Date().getFullYear();
const banner = `\
/**
 * ${pkg.description}
 * ${pkg.name} v${pkg.version}, ${pkg.homepage}
 * @copyright 2010${ndash}${yearNow} ${pkg.author.name}, ${pkg.author.url}
 * @license ${pkg.license}
 */`;

module.exports = {
    input: 'lib/start.js',
    output: {
        file: 'dist/shower.js',
        format: 'iife',
        name: 'shower',
        banner,
    },
    plugins: [resolve(), commonjs()],
};
