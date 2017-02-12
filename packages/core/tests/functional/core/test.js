'use strict';
module.exports = {
    '@tags': ['core'],

    // Init

    'uses `list` mode in lack of any': browser => {
        browser.url(`file:///${__dirname}/none.html`);
        browser.assert.elementPresent('.shower.list');
        browser.end();
    },

    'stays in `list` mode if `list` is present': browser => {
        browser.url(`file:///${__dirname}/list.html`);
        browser.assert.elementPresent('.shower.list');
        browser.end();
    },

    'stays in `full` mode if `full` is present': browser => {
        browser.url(`file:///${__dirname}/full.html`);
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'keeps `full` mode after reload': browser => {
        browser.url(`file:///${__dirname}/full.html`);
        browser.refresh();
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'adds IDs to all slides unless alredy set': browser => {
        browser.url(`file:///${__dirname}/list.html`);
        browser.assert.elementPresent('[id="1"]');
        browser.assert.elementNotPresent('[id="2"]');
        browser.assert.elementPresent('#id');
        browser.assert.elementPresent('[id="3"]');
        browser.end();
    },

    'doesn’t set any slide states on init': browser => {
        browser.url(`file:///${__dirname}/list.html`);
        browser.assert.elementNotPresent('.active');
        browser.assert.elementNotPresent('.visited');
        browser.end();
    },

    'sets `active` state to a current slide only (not `visited`)': browser => {
        browser.url(`file:///${__dirname}/list.html#id`);
        browser.assert.cssClassNotPresent('[id="1"]', 'active');
        browser.assert.cssClassNotPresent('[id="1"]', 'visited');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('#id', 'visited');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');
        browser.assert.cssClassNotPresent('[id="3"]', 'visited');
        browser.end();
    },

    // URL

    'activates a slide if its ID is present in URL': browser => {
        browser.url(`file:///${__dirname}/list.html#id`);
        browser.assert.cssClassPresent('#id', 'active');
        browser.end();
    },

    'changes non-existing ID to ID of the first slide in URL': browser => {
        browser.url(`file:///${__dirname}/list.html#404`);
        browser.assert.urlContains('#1'); // 'URL in Full mode'
        browser.end();
    },

    'activates the first slide if ID in URL doesn’t exist': browser => {
        browser.url(`file:///${__dirname}/list.html#404`);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    // Action

    'goes to `full` mode when a slide is clicked': browser => {
        browser.url(`file:///${__dirname}/list.html`);
        browser.click('[id="3"]');
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    // Traverse

    'changes slides states when moving forward': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.keys(browser.Keys.ARROW_RIGHT);

        browser.assert.cssClassNotPresent('[id="1"]', 'active');
        browser.assert.cssClassPresent('[id="1"]', 'visited');
        browser.assert.cssClassNotPresent('#id', 'active');
        browser.assert.cssClassPresent('#id', 'visited');
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.assert.cssClassNotPresent('[id="3"]', 'visited');
        browser.end();
    },

    'changes slides states when moving backward': browser => {
        browser.url(`file:///${__dirname}/list.html#3`);
        browser.keys(browser.Keys.ARROW_LEFT);
        browser.keys(browser.Keys.ARROW_LEFT);

        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.assert.cssClassNotPresent('[id="1"]', 'visited');
        browser.assert.cssClassNotPresent('#id', 'active');
        browser.assert.cssClassPresent('#id', 'visited');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');
        browser.assert.cssClassPresent('[id="3"]', 'visited');
        browser.end();
    },

    'changes slides states when moving forward and backward': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.keys(browser.Keys.ARROW_LEFT);
        browser.keys(browser.Keys.ARROW_LEFT);

        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.assert.cssClassPresent('[id="1"]', 'visited');
        browser.assert.cssClassNotPresent('#id', 'active');
        browser.assert.cssClassPresent('#id', 'visited');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');
        browser.assert.cssClassPresent('[id="3"]', 'visited');
        browser.end();
    },

    // History

    'goes to previous and next slides when moving back and forward in history': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.back();
        browser.back();
        browser.forward();

        browser.assert.cssClassNotPresent('[id="1"]', 'active');
        browser.assert.cssClassPresent('[id="1"]', 'visited');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassPresent('#id', 'visited');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');
        browser.assert.cssClassPresent('[id="3"]', 'visited');
        browser.end();
    },
};
