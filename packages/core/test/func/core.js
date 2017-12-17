'use strict';

module.exports = {
    '@tags': ['core'],

    'uses `list` mode in lack of any': browser => {
        browser.url(`${browser.launchUrl}/none.html`);
        browser.assert.elementPresent('.shower.list');
        browser.end();
    },

    'stays in `list` mode if `list` is present': browser => {
        browser.url(`${browser.launchUrl}/list.html`);
        browser.assert.elementPresent('.shower.list');
        browser.end();
    },

    'stays in `full` mode if `full` is present': browser => {
        browser.url(`${browser.launchUrl}/full.html`);
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'goes to `full` mode when a slide is clicked': browser => {
        browser.url(`${browser.launchUrl}/list.html`);
        browser.click('[id="1"]');
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'keeps `full` mode after reload': browser => {
        browser.url(`${browser.launchUrl}/list.html`);
        browser.click('[id="3"]');
        browser.refresh();
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'adds IDs to all slides unless alredy set': browser => {
        browser.url(`${browser.launchUrl}/list-id.html`);
        browser.assert.elementPresent('[id="1"]');
        browser.assert.elementNotPresent('[id="2"]');
        browser.assert.elementPresent('#id');
        browser.assert.elementPresent('[id="3"]');
        browser.end();
    },

    'skips slides with `hidden` attribute': browser => {
        browser.url(`${browser.launchUrl}/list-hidden.html`);
        browser.assert.elementPresent('[id="1"]');
        browser.assert.elementPresent('[id="2"]');
        browser.assert.elementNotPresent('[id="3"]');
        browser.end();
    },

    'doesn’t set any slide states on init': browser => {
        browser.url(`${browser.launchUrl}/list.html`);
        browser.assert.elementNotPresent('.active');
        browser.assert.elementNotPresent('.visited');
        browser.end();
    },

    'sets `active` state to a current slide only (not `visited`)': browser => {
        browser.url(`${browser.launchUrl}/list-id.html#id`);
        browser.assert.cssClassNotPresent('[id="1"]', 'active');
        browser.assert.cssClassNotPresent('[id="1"]', 'visited');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('#id', 'visited');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');
        browser.assert.cssClassNotPresent('[id="3"]', 'visited');
        browser.end();
    },
};
