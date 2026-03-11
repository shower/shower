# @shower/shower

Ready-to-use presentation template for the [Shower](https://github.com/shower/shower) HTML presentation engine.

## Quick Start

1. Download and unzip [shower.zip](http://shwr.me/shower.zip) template archive.
2. Open `index.html` in any text editor and start creating your presentation.

## Quick Start via CLI

You'll need [Node.js](https://nodejs.org/) installed on your computer.

1. Install Shower CLI utility: `npm install -g @shower/cli`.
2. Create your presentation: `shower create`.

## Quick Start with Hosting

1. Copy this repository to your account via GitHub.
	1. Open [import page](https://github.com/new/import).
	2. Use `https://github.com/shower/shower` for the repository URL
	3. Use your presentation name.
	4. Clone the resulted repository to your computer.
2. Install dependencies `npm install` and start a local server `npm start`.
3. Start editing your slides with live-reload.

Once you're done you can build a clean copy of your slides:

```sh
npm run bundle
```

You'll find your presentation in `bundled` folder. You can also run `npm run archive` to get the same files in `presentation.zip`.

Publish your presentation online by running:

```sh
npm run publish
```

You'll have your slides published to `https://USER.github.io/REPO/`.

## Browser Support

Latest stable versions of Chrome, Edge, Firefox, and Safari are supported.

---
Licensed under [MIT License](LICENSE.md).
