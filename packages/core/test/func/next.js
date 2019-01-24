'use strict';

module.exports = {
    '@tags': ['next'],

    'does not work in list mode (forwards)': browser => {
        browser.url(`${browser.globals.url}/list-next.html#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'does not work in list mode (backwards)': browser => {
        browser.url(`${browser.globals.url}/full-next.html#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.sendKeys('.send-keys', browser.Keys.ESCAPE);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves forwards': browser => {
        browser.url(`${browser.globals.url}/full-next.html#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'active');
        browser.assert.cssClassPresent('.b.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'active');
        browser.assert.cssClassPresent('.b.next', 'active');
        browser.assert.cssClassPresent('.c.next', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'moves backwards': browser => {
        browser.url(`${browser.globals.url}/full-next.html#2`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('.a.next', 'active');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassNotPresent('.a.next', 'active');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'remembers progress when switching slides': browser => {
        browser.url(`${browser.globals.url}/full-next.html#2`);
        browser.sendKeys('.send-keys', [browser.Keys.ARROW_RIGHT, browser.Keys.ARROW_RIGHT]);

        browser.execute(function() {
            location.hash = '1';
        });
        browser.execute(function() {
            location.hash = '2';
        });
        browser.assert.cssClassPresent('.a.next', 'active');
        browser.assert.cssClassPresent('.b.next', 'active');
        browser.end();
    },

    'does not step if once completed': browser => {
        const assertAllStepsActive = () => {
            browser.assert.cssClassPresent('[id="2"]', 'active');
            browser.assert.cssClassPresent('.a.next', 'active');
            browser.assert.cssClassPresent('.b.next', 'active');
            browser.assert.cssClassPresent('.c.next', 'active');
        };

        browser.url(`${browser.globals.url}/full-next.html#2`);
        browser.sendKeys('.send-keys', [
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
            browser.Keys.ARROW_RIGHT,
        ]);

        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        assertAllStepsActive();

        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="1"]', 'active');

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        assertAllStepsActive();

        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },
};
