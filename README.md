# Shower Presentation Template
[![Test status](https://github.com/shower/shower/workflows/Test/badge.svg)](https://github.com/shower/shower/actions/workflows/test.yml)

<img src="pictures/logo.png" width="250" alt="Shower logo">

> Shower ['ʃəuə] noun. A person or thing that shows.

1. Built on HTML, CSS and vanilla JavaScript.
2. Works in all modern browsers.
3. Themes are separated from engine.
4. Fully keyboard accessible.
5. Printable to PDF.

[See it in action](https://shwr.me/). Includes [Ribbon](https://github.com/shower/ribbon/) and [Material](https://github.com/shower/material/) themes, and [core](https://github.com/shower/core/) with plugins.

Follow [@shower_me](https://twitter.com/shower_me) for support and updates, [file an issue](https://github.com/shower/shower/issues/new) if you have any.

## Quick Start

1. Download and unzip [shower.zip](http://shwr.me/shower.zip) template archive.
2. Open `index.html` in any text editor and start creating your presentation.

## Quick Start via CLI

You’ll need [Node.js](https://nodejs.org/) installed on your computer.

1. Install Shower CLI utility: `npm install -g @shower/cli`.
2. Create your presentation: `shower create`.

Read more on [shower/cli](https://github.com/shower/cli/) page.

## Quick Start with Hosting

You’ll need [Node.js](https://nodejs.org/) installed on your computer.

1. Copy this repository to your account via GitHub.
	1. Open [import page](https://github.com/new/import).
	2. Use `https://github.com/shower/shower` for the repository URL
	3. Use your presentation name.
	4. Clone the resulted repository to your computer.
2. Install dependencies `npm install` and start a local server `npm start`.
3. Start editing your slides with live-reload.

Once you’re done you can build a clean copy of your slides:

```sh
npm run bundle
```

You’ll find your presentation in `bundled` folder. You can also run `npm run archive` to get the same files in `presentation.zip`.

Publish your presentation online by running:

```sh
npm run publish
```

You’ll have your slides published to `https://USER.github.io/REPO/`.

## Deploy to Netlify

By clicking the button below you can fork this repo and deploy it to Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shower/shower)

By doing this you would get a GitHub repo linked with Netlify in a way any change to the repo would trigger a Shower rebuild and deploy to Netlify servers, which allows for an easy way to create and share Shower presentation without the need to install anything locally.

## Browser Support

Latest stable versions of Chrome, Edge, Firefox, and Safari are supported.

## Contributing

You’re always welcome to contribute. Fork project, make changes and send it as pull request. But it’s better to file an [issue](https://github.com/shower/shower/issues) with your idea first. Read [contributing rules](CONTRIBUTING.md) for more details.

Main contributors in historical order: [pepelsbey](https://github.com/pepelsbey), [jahson](https://github.com/jahson), [miripiruni](https://github.com/miripiruni), [kizu](https://github.com/kizu), [artpolikarpov](https://github.com/artpolikarpov), [tonyganch](https://github.com/tonyganch), [zloylos](https://github.com/zloylos), [shvaikalesh](https://github.com/shvaikalesh).

---
Licensed under [MIT License](LICENSE.md).
