# Shower CLI

**Command line interface for [Shower](http://shwr.me/)**

[![npm](https://img.shields.io/npm/v/shower-cli.svg)](https://www.npmjs.com/package/shower-cli)
[![Build Status](https://travis-ci.org/shower/cli.svg?branch=master)](https://travis-ci.org/shower/cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/shower/cli/blob/master/LICENSE.md)

## Quick Creating Slides

```sh
npx shower-cli create my-slides
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher)*

## Installation

Install ShowerCLI using `npm`:
```bash
$ npm install --global shower-cli
```

or via `yarn`:
```bash
$ yarn global add shower-cli
```

The minimum supported Node version is `v8.0.0` by default.

**Note:** For easy creation of slides for one command,
          we recommend installing the `ShowerCLI` globally.
          After the presentation is created, ShowerCLI
          is added as dev-dependencies by default

## Usage:

```bash
shower [--version] [--help] <command> [<args>]
```

### Create presentation

`$ shower create [<directory>]` - Creating a new project

### Run development server

`$ shower serve` - Serve a the presentation in development mode

### Prepare presentation

`$ shower prepare` - Gather the necessary files in a separate folder

### Create an archive of the prepared presentation

`$ shower archive` - To create an archive of the presentation

### Convert presentation to PDF

`$ shower pdf` - Converts the presentation to PDF

### Publish presentation with [GitHub Pages](https://pages.github.com/)

`$ shower publish` - Publish your project to GitHub Pages
