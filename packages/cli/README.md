# Shower CLI

Command line interface for [Shower](https://shwr.me/) HTML presentation engine.

## Quick Start

```sh
npx @shower/cli create my-slides
```

## Installation

Install Shower CLI globally using npm:

```sh
npm install --global @shower/cli
```

The minimum supported Node version is v22.0.0.

After the presentation is created, `@shower/cli` is added as a dev dependency by default, so global installation is only needed for the initial setup.

## Commands

```
shower [--version] [--help] <command> [<args>]

Options:
	--cwd          working directory to use               [string] [default: $PWD]
	-h, --help     Show help                                             [boolean]
	-v, --version  Show version number                                   [boolean]
```

### `shower create [<directory>]`

Create a new project.

```
Positionals:
	directory                                                  [default: "slides"]

Options:
	--yes, -y                                           [boolean] [default: false]
```

### `shower serve`

Serve the presentation in development mode.

```
Options:
	--open, -o     Open browser                                   [default: false]
	--port, -p     Listening port                         [number] [default: 8080]
```

### `shower bundle`

Gather the necessary files in a separate folder.

```
Options:
	--output, -o   Output folder                       [string] [default: "bundled"]
	--files, -f    List of files to include                               [array]
```

### `shower archive`

Create a ZIP archive of the presentation.

```
Options:
	--output, -o   Archive name             [string] [default: "presentation.zip"]
	--files, -f    List of files to include                               [array]
```

### `shower pdf`

Convert the presentation to PDF. Chrome or Chromium is required. If installed to a custom path, set the `PUPPETEER_EXECUTABLE_PATH` environment variable.

```
Options:
	--output, -o   File name                       [string] [default: "index.pdf"]
```

### `shower publish`

Publish the presentation to [GitHub Pages](https://pages.github.com/).

```
Options:
	--files, -f    List of files to include                               [array]
```

---
Licensed under [MIT License](LICENSE.md).
