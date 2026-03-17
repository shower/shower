# Shower CLI

Command line interface for [Shower](https://shwr.me/) HTML slides engine.

## Quick start

```sh
npx @shower/cli new my-slides
```

## Installation

Install Shower CLI globally using npm:

```sh
npm install --global @shower/cli
```

The minimum supported Node version is v22.0.0.

After the slides are created, `@shower/cli` is added as a dev dependency by default. Inside the project, you can run commands via npm scripts:

```sh
npm run serve
npm run bundle
npm run archive
npm run publish
npm run pdf
```

## Commands

| Option            | Description              | Type    | Default        |
| ----------------- | ------------------------ | ------- | -------------- |
| `--cwd`           | Working directory to use | string  | Current folder |
| `-h`, `--help`    | Show help                | boolean |                |
| `-v`, `--version` | Show version number      | boolean |                |

### `shower new [<directory>]`

Create a new project. Also available as `shower create`.

| Option          | Description                   | Type    | Default  |
| --------------- | ----------------------------- | ------- | -------- |
| `<directory>`   | Target directory              | string  | `slides` |
| `-y`, `--yes`   | Skip prompts and use defaults | boolean | `false`  |

### `shower serve`

Serve the slides in development mode.

| Option         | Description    | Type    | Default |
| -------------- | -------------- | ------- | ------- |
| `-o`, `--open` | Open browser   | boolean | `false` |
| `-p`, `--port` | Listening port | number  | `8080`  |

### `shower bundle`

Gather the necessary files in a separate folder. The `slides` folder is self-contained and ready to deploy to a static host.

The Shower engine (`@shower/core`) and themes listed in `dependencies` are bundled automatically. Slides files are configured via the `"files"` field in `package.json`. By default, a new project includes:

```json
"files": [
	"pictures/**",
	"index.html"
]
```

Add any custom directories or files your slides need:

```diff
"files": [
	"pictures/**",
+    "demos/**",
	"index.html"
]
```

| Option           | Description                            | Type   | Default   |
| ---------------- | -------------------------------------- | ------ | --------- |
| `-o`, `--output` | Output folder                          | string | `slides`  |
| `-f`, `--files`  | Override `"files"` from `package.json` | array  |           |

### `shower archive`

Create a ZIP archive of the slides. Uses `bundle` under the hood to prepare the files before archiving.

| Option           | Description              | Type   | Default            |
| ---------------- | ------------------------ | ------ | ------------------ |
| `-o`, `--output` | Archive name             | string | `slides.zip`       |
| `-f`, `--files`  | List of files to include | array  |                    |

### `shower publish`

Publish the slides to [GitHub Pages](https://pages.github.com/). Uses `bundle` under the hood to prepare the files before publishing.

| Option          | Description              | Type  | Default |
| --------------- | ------------------------ | ----- | ------- |
| `-f`, `--files` | List of files to include | array |         |

### `shower pdf`

Convert the slides to PDF. On first run, a PDF engine (~200 MB) will be downloaded to a local cache (`~/.cache/shower` on macOS/Linux, `%LOCALAPPDATA%\shower` on Windows).

| Option           | Description | Type   | Default     |
| ---------------- | ----------- | ------ | ----------- |
| `-o`, `--output` | File name   | string | `slides.pdf` |

---
Licensed under [MIT License](LICENSE.md).
