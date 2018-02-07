# Shower Presentation Template [![Build Status](https://travis-ci.org/shower/shower.svg?branch=master)](https://travis-ci.org/shower/shower)

<img src="pictures/logo.png" width="250" alt="Shower logo">

> Shower ['ʃəuə] noun. A person or thing that shows.

1. Built on HTML, CSS and vanilla JavaScript
2. Works in all modern browsers
3. Themes are separated from engine
4. Modular and extensible
5. Fully keyboard accessible
6. Printable to PDF

[See it in action](http://shwr.me/). Includes [Ribbon](https://github.com/shower/ribbon/) and [Material](https://github.com/shower/material/) themes, and [core](https://github.com/shower/core/) with plugins.

Follow [@shower_me](https://twitter.com/shower_me) for support and updates, [file an issue](https://github.com/shower/shower/issues/new) if you have any.

## Quick Start

1. Download and unzip [template archive](http://shwr.me/shower.zip)
2. Open `index.html` and start creating your presentation

## Advanced

1. Clone this repository locally `git clone git@github.com:shower/shower.git`.
2. [Create](https://github.com/new) a new blank repository and copy its cloning address `git@github.com:USER/REPO.git`.
3. Change remote of your local clone to the one you’ve just copied `git remote set-url origin git@github.com:USER/REPO.git`.
4. Push your local clone to GitHub `git push -u origin master`.
6. Install dependencies `npm install` and start it `npm start`.

Once you’re done you can build a clean copy of your slides:

	npm run prepare

And you’ll find your presentation in `prepared` folder with only needed files in it. You can also run `npm run archive` to get the same files in `archive.zip`. But there’s more! You can easily publish your presentation online by running:

	npm run publish

And you’ll have your slides published to `http://USER.github.io/REPO/`.

## Usage Examples

- [Inhuman UI](https://pepelsbey.net/pres/inhuman-ui/)
- [My Vanilla CSS](https://pepelsbey.net/pres/vanilla-css/)
- [I’m in IoT](https://pepelsbey.net/pres/im-in-iot/)
- [Enough Bricks](https://pepelsbey.net/pres/enough-bricks/)

## Browser Support

Latest stable versions of Chrome, Edge, Firefox, and Safari are supported.

## Contributing

You’re always welcome to contribute. Fork project, make changes and send it as pull request. But it’s better to file an [issue](https://github.com/shower/shower/issues) with your idea first. Read [contributing rules](CONTRIBUTING.md) for more details.

Main contributors in historical order: [pepelsbey](https://github.com/pepelsbey), [jahson](https://github.com/jahson), [miripiruni](https://github.com/miripiruni), [kizu](https://github.com/kizu), [artpolikarpov](https://github.com/artpolikarpov), [tonyganch](https://github.com/tonyganch), [zloylos](https://github.com/zloylos).

---
Licensed under [MIT License](LICENSE.md).
