# Shower CLI

<a href="https://shwr.me" title="Shower website">
	<img align="right" width="95" height="95" alt="Shower logo" src="https://shower.github.io/shower/pictures/logo.svg">
</a>

**Command line interface for [Shower](https://shwr.me/)**

[![npm](https://img.shields.io/npm/v/@shower/cli.svg)](https://www.npmjs.com/package/@shower/cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/shower/shower/blob/main/packages/cli/LICENSE.md)

## Quick Creating Slides

```sh
npx @shower/cli create my-slides
```

## Installation

Install ShowerCLI using `npm`:
```bash
npm install --global @shower/cli
```

The minimum supported Node version is `v22.0.0`.

**Note:** For easy creation of slides for one command, we recommend installing the `@shower/cli` globally. After the presentation is created, ShowerCLI is added as dev-dependencies by default.

## Usage:

```
shower [--version] [--help] [<command> [<args>]]

Options:
	--cwd          working directory to use               [string] [default: $PWD]
	-h, --help     Show help                                             [boolean]
	-v, --version  Show version number                                   [boolean]
```

**`$ shower create [<directory>]` - Create a new project**

```
Positionals:
	directory                                                  [default: "slides"]

Options:
	--yes, -y                                           [boolean] [default: false]
```

**`$ shower serve` - Serve the presentation in development mode**

```
Options:
	--open, -o     Open browser                                   [default: false]
	--port, -p     Listening Port                         [number] [default: 8080]
	--ui           Whether to run BrowserSync UI                  [default: false]
	--notify       Whether to show BrowserSync notifications      [default: false]
```


**`$ shower bundle` - Gather the necessary files in a separate folder**

```
Options:
	--output, -o   In which folder will the bundled presentation be written [string] [default: "bundled"]
	--files, -f    List of files that will get the build                   [array]
```

**`$ shower archive` - Create an archive of the bundled presentation**

```
Options:
	--output, -o   Archive name             [string] [default: "presentation.zip"]
	--files, -f    List of files that will get the build                   [array]
```

**`$ shower pdf` - Converts the presentation to PDF**

The browser that [implements the Chrome Debugging Protocol](https://github.com/cyrus-and/chrome-remote-interface/#implementations) is required.
If you installed Chrome / Chromium to the custom path or use another browser, set PUPPETEER_EXECUTABLE_PATH environment variable.

```
Options:
	--output, -o   File name                       [string] [default: "index.pdf"]
```

**`$ shower publish` - Publish presentation with [GitHub Pages](https://pages.github.com/)**

```
Options:
	--files, -f    List of files that will get the build                   [array]
```

---
Licensed under [MIT License](LICENSE.md).
