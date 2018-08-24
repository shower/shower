# Shower CLI

**Command line interface for [Shower](http://shwr.me/)**

[![Build Status](https://travis-ci.org/shower/cli.svg?branch=master)](https://travis-ci.org/shower/cli)

## Quick Creating Slides

```sh
npx shower-cli create my-slides
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher)*

## Installation

```bash
npm i -g shower-cli
```

## Usage:

```bash
shower [--version] [--help] <command> [<args>]
```

### Commands:

 - `serve` - Serve a the presentation in development mode
 - `pdf [<file>]` - Converts the presentation to PDF
 - `archive [<file>]` - To create an archive of the presentation
 - `create [<directory>]` - Creating a new project
 - `prepare [<directory>]` - Gather the necessary files in a separate folder
 - `publish` - Publish your project to GitHub Pages
