'use strict';

module.exports = {
    '@tags': ['next'],

    'does not work in list mode (forwards)': (browser) => {
        browser.url(`${browser.launchUrl}/list-next#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'does not work in list mode (backwards)': (browser) => {
        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', [
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ESCAPE,
            browser.Keys.ARROW_LEFT,
        ]);

        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves forwards': (browser) => {
        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'visited');
        browser.assert.cssClassPresent('.b.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'visited');
        browser.assert.cssClassPresent('.b.next', 'visited');
        browser.assert.cssClassPresent('.c.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.c.next', 'visited');
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'moves backwards': (browser) => {
        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', [
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_LEFT,
        ]);

        browser.assert.cssClassPresent('.a.next', ['visited', 'active']);
        browser.assert.not.cssClassPresent('.b.next', ['visited', 'active']);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.not.cssClassPresent('.a.next', ['visited', 'active']);
        browser.end();
    },

    'does not complete slide when moving backwards': (browser) => {
        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', [
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_LEFT,
        ]);

        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.assert.not.cssClassPresent('[id="1"]', 'active');

        browser.assert.cssClassPresent('.a.next', 'visited');
        browser.assert.cssClassPresent('.b.next', ['visited', 'active']);
        browser.assert.not.cssClassPresent('.c.next', ['visited', 'active']);
    },

    'remembers progress when switching slides': (browser) => {
        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', [browser.Keys.ARROW_RIGHT, browser.Keys.ARROW_RIGHT]);

        browser.execute(function () {
            location.hash = '1';
        });
        browser.execute(function () {
            location.hash = '2';
        });
        browser.assert.cssClassPresent('.a.next', 'visited');
        browser.assert.cssClassPresent('.b.next', 'active');
        browser.end();
    },

    'does not step if once completed': (browser) => {
        const assertAllStepsVisited = () => {
            browser.assert.cssClassPresent('[id="2"]', 'active');
            browser.assert.cssClassPresent('.a.next', 'visited');
            browser.assert.cssClassPresent('.b.next', 'visited');
            browser.assert.cssClassPresent('.c.next', 'visited');
        };

        browser.url(`${browser.launchUrl}/full-next#2`);
        browser.sendKeys('.send-keys', [
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
        ]);

        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        assertAllStepsVisited();

        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="1"]', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        assertAllStepsVisited();

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },
};
