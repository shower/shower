# Shower CLI

Command line interface for [Shower](https://shwr.me/) HTML presentation engine.

## Quick start

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

| Option            | Description              | Type    | Default        |
| ----------------- | ------------------------ | ------- | -------------- |
| `--cwd`           | Working directory to use | string  | Current folder |
| `-h`, `--help`    | Show help                | boolean |                |
| `-v`, `--version` | Show version number      | boolean |                |

### `shower create [<directory>]`

Create a new project.

| Option          | Description                   | Type    | Default  |
| --------------- | ----------------------------- | ------- | -------- |
| `<directory>`   | Target directory              | string  | `slides` |
| `-y`, `--yes`   | Skip prompts and use defaults | boolean | `false`  |

### `shower serve`

Serve the presentation in development mode.

| Option         | Description    | Type    | Default |
| -------------- | -------------- | ------- | ------- |
| `-o`, `--open` | Open browser   | boolean | `false` |
| `-p`, `--port` | Listening port | number  | `8080`  |

### `shower bundle`

Gather the necessary files in a separate folder.

| Option           | Description              | Type   | Default   |
| ---------------- | ------------------------ | ------ | --------- |
| `-o`, `--output` | Output folder            | string | `bundled` |
| `-f`, `--files`  | List of files to include | array  |           |

### `shower archive`

Create a ZIP archive of the presentation.

| Option           | Description              | Type   | Default            |
| ---------------- | ------------------------ | ------ | ------------------ |
| `-o`, `--output` | Archive name             | string | `presentation.zip` |
| `-f`, `--files`  | List of files to include | array  |                    |

### `shower pdf`

Convert the presentation to PDF. Chrome or Chromium is required. If installed to a custom path, set the `PUPPETEER_EXECUTABLE_PATH` environment variable.

| Option           | Description | Type   | Default     |
| ---------------- | ----------- | ------ | ----------- |
| `-o`, `--output` | File name   | string | `index.pdf` |

### `shower publish`

Publish the presentation to [GitHub Pages](https://pages.github.com/).

| Option          | Description              | Type  | Default |
| --------------- | ------------------------ | ----- | ------- |
| `-f`, `--files` | List of files to include | array |         |

---
Licensed under [MIT License](LICENSE.md).
