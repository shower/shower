import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json'));

// import pkg from './package.json';

const ndash = '\u2013';
const yearNow = new Date().getFullYear();
const banner = `\
/**
 * ${pkg.description}
 * ${pkg.name} v${pkg.version}, ${pkg.homepage}
 * @copyright 2010${ndash}${yearNow} ${pkg.author.name}, ${pkg.author.url}
 * @license ${pkg.license}
 */`;

export default {
    input: 'lib/start.js',
    output: {
        file: 'dist/shower.js',
        format: 'iife',
        name: 'shower',
        banner,
    },
};
