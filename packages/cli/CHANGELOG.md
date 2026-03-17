# Changelog

## 1.0.0

- `archive` and `publish` now reuse `bundle` under the hood ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- `publish` shows GitHub Pages URL after publishing ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- `publish` no longer pushes dotfiles to `gh-pages` branch ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Add progress indicators to `bundle`, `archive`, and `publish` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Rename default outputs: `slides.pdf`, `slides.zip` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Fix Node.js deprecation warning in `publish` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Fix `pdf` output path not resolved relative to `--cwd` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Fix `--open` flag type in `serve` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Fix missing error handling for zip write stream in `archive` ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Fix Windows path separator in bundle file copying ([31f13b98](https://github.com/shower/shower/commit/31f13b98))
- Bundle only the selected theme and files listed in `package.json` ([b3c196e0](https://github.com/shower/shower/commit/b3c196e0))
- Rename `shower create` to `shower new`, keep `create` as alias ([0f377b76](https://github.com/shower/shower/commit/0f377b76))
- New PDF engine: auto-downloads on first run, no system Chrome required ([6596ada3](https://github.com/shower/shower/commit/6596ada3))

## 0.5.2

- Fix inquirer list prompts not showing choices in v13 ([8fa28791](https://github.com/shower/shower/commit/8fa28791))

## 0.5.1

- Fix crash when running CLI without a subcommand ([f766400e](https://github.com/shower/shower/commit/f766400e))

## 0.5.0

- **Breaking:** Minimum Node.js version bumped to v22 ([8b6dd477](https://github.com/shower/shower/commit/8b6dd477))
- **Breaking:** Remove `--ui` and `--notify` flags from `shower serve` ([9661d276](https://github.com/shower/shower/commit/9661d276))
- Replace browser-sync with Vite dev server ([9661d276](https://github.com/shower/shower/commit/9661d276))
- Replace Gulp streaming pipeline with native `node:fs` APIs ([59db3b1d](https://github.com/shower/shower/commit/59db3b1d))
- Replace `chalk` with native `util.styleText()` ([738e92d5](https://github.com/shower/shower/commit/738e92d5))
- Replace `listr` with a custom task runner using `util.styleText()` ([738e92d5](https://github.com/shower/shower/commit/738e92d5))
- Replace `jest` with Node.js built-in test runner ([dd4d936d](https://github.com/shower/shower/commit/dd4d936d))
- Replace `execa` with native `child_process.execFile()` ([59db3b1d](https://github.com/shower/shower/commit/59db3b1d))
- Replace `tmp` with native `fs.mkdtemp()` ([8b6dd477](https://github.com/shower/shower/commit/8b6dd477))
- Replace `semver` with simple version comparison ([8b6dd477](https://github.com/shower/shower/commit/8b6dd477))
- Replace `gulp-zip` with `archiver` ([59db3b1d](https://github.com/shower/shower/commit/59db3b1d))
- Remove `update-notifier` ([8b6dd477](https://github.com/shower/shower/commit/8b6dd477))
- Remove unused `pdf-parse` dev dependency ([dd4d936d](https://github.com/shower/shower/commit/dd4d936d))
- Fix bug in `pdf` test passing wrong option name ([738e92d5](https://github.com/shower/shower/commit/738e92d5))
- Clean up README ([e4225fea](https://github.com/shower/shower/commit/e4225fea))

## 0.4.0

- Update deps, convert to ESM ([6f9b6bdc](https://github.com/shower/shower/commit/6f9b6bdc))
- Remove spellchecker ([f28948e6](https://github.com/shower/shower/commit/f28948e6))
- Fix regex for theme link replacement to support line breaks ([84f23e3d](https://github.com/shower/shower/commit/84f23e3d))
- Fix run bundle script for self-closed tag `<link .../>` ([c00ae96](https://github.com/shower/shower/commit/c00ae96))

## 0.3.1

- Fix #56: fix load root dir in windows ([e965f9eb](https://github.com/shower/shower/commit/e965f9eb))
- Revert "Add new options for command 'shower create'" ([df957359](https://github.com/shower/shower/commit/df957359))
- Add new options for command 'shower create' ([eae785dd](https://github.com/shower/shower/commit/eae785dd))
- Rename prepare to bundle ([9a4a87c2](https://github.com/shower/shower/commit/9a4a87c2))
- Make package.json private ([0b77e5b7](https://github.com/shower/shower/commit/0b77e5b7))
- Update dependencies ([2385157c](https://github.com/shower/shower/commit/2385157c))

## 0.3.0

- Core path update ([d5f536c6](https://github.com/shower/shower/commit/d5f536c6))
- Update dependencies ([8224f0a](https://github.com/shower/shower/commit/8224f0a))

## 0.2.10

- Update dependencies ([8224f0a](https://github.com/shower/shower/commit/8224f0a))
- Update the `@shower/core` to `v3.0.0` ([d5f536c](https://github.com/shower/shower/commit/d5f536c))

## 0.2.9

- OSX and Windows support ([5c8f466](https://github.com/shower/shower/commit/5c8f466))
- Package migrated to `@shower/cli` ([e3553dd](https://github.com/shower/shower/commit/e3553dd))
- Update dependencies ([be77708c](https://github.com/shower/shower/commit/be77708c))

## 0.2.8

- Documentation for commands ([deb1b08](https://github.com/shower/shower/commit/deb1b08))
- `--yes` flag in `create` command ([0ea40d4](https://github.com/shower/shower/commit/0ea40d4))
- Alias `new` to `create` command ([4f41c526](https://github.com/shower/shower/commit/4f41c526))
- Short alias for `help` and `version` commands ([2f24898](https://github.com/shower/shower/commit/2f24898))

## 0.2.7

- OSX and Windows support ([0d7920a](https://github.com/shower/shower/commit/0d7920a))
- Package migrated to `@shower/cli` ([5baa00b](https://github.com/shower/shower/commit/5baa00b))
- Update dependencies ([f5cdb547](https://github.com/shower/shower/commit/f5cdb547))

## 0.2.6

- Update dependencies ([ba53b2bd](https://github.com/shower/shower/commit/ba53b2bd))

## 0.2.5

- Change paths for themes to org ([fa66f81](https://github.com/shower/shower/commit/fa66f81))
- Make publish command useful ([ebd4346](https://github.com/shower/shower/commit/ebd4346))

## 0.2.4

- Fixes `prepare` and `archive` tasks ([7a5813e](https://github.com/shower/shower/commit/7a5813e))

## 0.2.3

- Merge pull request #17 ([e4dec947](https://github.com/shower/shower/commit/e4dec947))
- Fix 4:3 ratio, change separator to colon ([dce0df3](https://github.com/shower/shower/commit/dce0df3))
- Added "notify" and "ui" options to the "serve" command ([90a761ee](https://github.com/shower/shower/commit/90a761ee))

## 0.2.2

- I clear the folder before build ([65fe95cd](https://github.com/shower/shower/commit/65fe95cd))

## 0.2.2-1

- Revert "Added babel build" ([3787ad9e](https://github.com/shower/shower/commit/3787ad9e))

## 0.2.2-0

- Minor fixes ([d3245817](https://github.com/shower/shower/commit/d3245817))

## 0.2.1

- Fixed launch from home folder ([1775678e](https://github.com/shower/shower/commit/1775678e))

## 0.2.0

- Removed old dependencies ([dd5f8dd3](https://github.com/shower/shower/commit/dd5f8dd3))
- Files specified in files are considered to be part of the presentation ([13b8a587](https://github.com/shower/shower/commit/13b8a587))

## 0.2.0-3

- Processed the case when the folder in which the presentation should be created already exists ([ce3a221e](https://github.com/shower/shower/commit/ce3a221e))
- Implemented the ability to customize the presentation when creating ([36c39eb8](https://github.com/shower/shower/commit/36c39eb8))
- Added the update-notifier ([0c8a6791](https://github.com/shower/shower/commit/0c8a6791))

## 0.2.0-2

- Removed to create 'temp' dir ([36c7182d](https://github.com/shower/shower/commit/36c7182d))
- Minor fixes ([51cf12b](https://github.com/shower/shower/commit/51cf12b))

## 0.2.0-1

- Added the 'publish' task ([5345ff35](https://github.com/shower/shower/commit/5345ff35))

## 0.2.0-0

- Added a check on the existence of the presentation ([b15562a3](https://github.com/shower/shower/commit/b15562a3))
- Add the bundle and archive tasks to readme ([67d9537d](https://github.com/shower/shower/commit/67d9537d))
- Created the bundled and archive tasks ([03341e1](https://github.com/shower/shower/commit/03341e1))
- Wrote a new mechanism for creating a presentation ([e6627c43](https://github.com/shower/shower/commit/e6627c43))
- Added exit codes ([f6402f4d](https://github.com/shower/shower/commit/f6402f4d))
- Upgrade error handling in pdf ([a416f4f0](https://github.com/shower/shower/commit/a416f4f0))

## 0.1.4

- Fixed pdf, fixes #8 ([a04ce008](https://github.com/shower/shower/commit/a04ce008))

## 0.1.3

- Added the dynamic loading page size, fixes #6 ([d300cb44](https://github.com/shower/shower/commit/d300cb44))

## 0.1.2

- Renamed the bin script to `shower`, fixes #7 ([9d388d30](https://github.com/shower/shower/commit/9d388d30))

## 0.1.1

- Moved serve to browser-sync ([4bfd654c](https://github.com/shower/shower/commit/4bfd654c))
- Fixed the task end-message ([75dbb2e](https://github.com/shower/shower/commit/75dbb2e))
- Merge pull request #4 ([5a56e9b8](https://github.com/shower/shower/commit/5a56e9b8))
- Fixed the js-API ([8954ea1c](https://github.com/shower/shower/commit/8954ea1c))

## 0.1.0

- Initial release. ([5fa276a](https://github.com/shower/shower/commit/5fa276a))
