'use strict';

module.exports = {
    '@tags': ['core'],

    'uses `list` mode in lack of any': (browser) => {
        browser.url(`${browser.launchUrl}/none`);
        browser.assert.cssClassPresent('.shower', 'list');
        browser.end();
    },

    'stays in `list` mode if `list` is present': (browser) => {
        browser.url(`${browser.launchUrl}/list`);
        browser.assert.cssClassPresent('.shower', 'list');
        browser.end();
    },

    'stays in `full` mode if `full` is present': (browser) => {
        browser.url(`${browser.launchUrl}/full`);
        browser.assert.cssClassPresent('.shower', 'full');
        browser.end();
    },

    'goes to `full` mode when a slide is clicked': (browser) => {
        browser.url(`${browser.launchUrl}/list`);
        browser.click('[id="1"]');
        browser.assert.cssClassPresent('.shower', 'full');
        browser.end();
    },

    'adds IDs to all slides unless already set': (browser) => {
        browser.url(`${browser.launchUrl}/list-id`);
        browser.assert.elementPresent('[id="1"]');
        browser.assert.not.elementPresent('[id="2"]');
        browser.assert.elementPresent('#id');
        browser.assert.elementPresent('[id="3"]');
        browser.end();
    },

    'skips slides with `hidden` attribute': (browser) => {
        browser.url(`${browser.launchUrl}/list-hidden`);
        browser.assert.elementPresent('[id="1"]');
        browser.assert.elementPresent('[id="2"]');
        browser.assert.not.elementPresent('[id="3"]');
        browser.end();
    },

    'doesn’t set any slide states on init': (browser) => {
        browser.url(`${browser.launchUrl}/list`);
        browser.assert.not.elementPresent('.active');
        browser.assert.not.elementPresent('.visited');
        browser.end();
    },

    'sets `active` state to a current slide only (not `visited`)': (browser) => {
        browser.url(`${browser.launchUrl}/list-id#id`);
        browser.assert.not.cssClassPresent('[id="1"]', 'active');
        browser.assert.not.cssClassPresent('[id="1"]', 'visited');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.not.cssClassPresent('#id', 'visited');
        browser.assert.not.cssClassPresent('[id="3"]', 'active');
        browser.assert.not.cssClassPresent('[id="3"]', 'visited');
        browser.end();
    },
};
