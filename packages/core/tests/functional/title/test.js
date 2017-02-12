'use strict';
module.exports = {
    '@tags': ['title'],

    beforeEach: browser => {
        browser.url(`file:///${__dirname}/list.html`);
    },

    'stays unchanged in `list` mode': browser => {
        browser.assert.title('Title');
        browser.end();
    },

    'gets prepended with current slide title in `full` mode': browser => {
        browser.click('[id="1"]');
        browser.assert.title('1 — Title');
        browser.end();
    },

    'gets stripped from HTML tags while prepending': browser => {
        browser.click('[id="3"]');
        browser.assert.title('3 — Title');
        browser.end();
    },

    'doesn’t change if slide title is missing': browser => {
        browser.click('[id="2"]');
        browser.assert.title('Title');
        browser.end();
    },
};
