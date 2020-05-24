'use strict';

const { URL } = require('url');

const composeURL = (opts) => {
    const url = new URL(`http://localhost:${process.env.npm_package_config_test_port}`);
    url.searchParams.set(
        'echo',
        `
            <!DOCTYPE html>
            <head>
                <meta charset="utf-8">
                <title>Shower start test</title>
                ${opts.head || ''}
            </head>
            <body class="${opts.containerClass || 'shower'} full">
                <section id="a" class="slide">
                    <h2>1</h2>
                </section>
                <section id="b" class="slide">
                    <h2>2</h2>
                </section>
                <section id="c" class="slide">
                    <h2>3</h2>
                </section>
                ${opts.body || ''}
            </body>
        `,
    );

    return `${url}`;
};

const containerClass = 'custom';

module.exports = {
    '@tags': ['start'],

    'sync shower in <head>': (browser) => {
        browser.url(
            composeURL({
                head: `
                    <script src="shower.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#a', 'active');
        browser.end();
    },

    'sync shower & data-* config in <head>': (browser) => {
        browser.url(
            composeURL({
                containerClass,
                head: `
                    <script src="shower.js" data-container-selector=".${containerClass}"></script>
                    <script src="plugin.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'sync shower, config <script>, and plugin in <head>': (browser) => {
        browser.url(
            composeURL({
                containerClass,
                head: `
                    <script src="shower.js"></script>
                    <script>
                        shower.configure({
                            containerSelector: '.${containerClass}',
                        });
                    </script>
                    <script src="plugin.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'sync shower in <body>': (browser) => {
        browser.url(
            composeURL({
                body: `
                    <script src="shower.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#a', 'active');
        browser.end();
    },

    'sync shower & plugin in <body>': (browser) => {
        browser.url(
            composeURL({
                body: `
                    <script src="shower.js"></script>
                    <script src="plugin.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'sync shower, config <script>, and plugin in <body>': (browser) => {
        browser.url(
            composeURL({
                containerClass,
                body: `
                    <script src="shower.js"></script>
                    <script>
                        shower.configure({
                            containerSelector: '.${containerClass}',
                        });
                    </script>
                    <script src="plugin.js"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'deferred shower': (browser) => {
        browser.url(
            composeURL({
                head: `
                    <script src="shower.js" defer></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#a', 'active');
        browser.end();
    },

    'deferred shower & plugin': (browser) => {
        browser.url(
            composeURL({
                head: `
                    <script src="shower.js" defer></script>
                    <script src="plugin.js" defer></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'deferred shower, data-* config, and plugin': (browser) => {
        browser.url(
            composeURL({
                containerClass,
                head: `
                    <script src="shower.js" defer data-container-selector=".${containerClass}"></script>
                    <script src="plugin.js" defer></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#c', 'active');
        browser.end();
    },

    'async shower': (browser) => {
        browser.url(
            composeURL({
                head: `
                    <script src="shower.js" async></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#a', 'active');
        browser.end();
    },

    'async shower & data-* config': (browser) => {
        browser.url(
            composeURL({
                containerClass,
                head: `
                    <script src="shower.js" async data-container-selector=".${containerClass}"></script>
                `,
            }),
        );

        browser.assert.cssClassPresent('#a', 'active');
        browser.end();
    },
};
