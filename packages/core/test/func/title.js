const mdash = '\u2014';

module.exports = {
    '@tags': ['title'],

    'stays unchanged in `list` mode': (browser) => {
        browser.url(`${browser.launchUrl}/list-title`);
        browser.assert.title('title');
        browser.end();
    },

    'stays unchanged in `full` mode if slide title is missing': (browser) => {
        browser.url(`${browser.launchUrl}/list-title#2`);
        browser.assert.title('title');
        browser.end();
    },

    'gets prepended with current slide title in `full` mode': (browser) => {
        browser.url(`${browser.launchUrl}/full-title`);
        browser.assert.title(`1 ${mdash} title`);
        browser.end();
    },

    'gets stripped from HTML tags while prepending': (browser) => {
        browser.url(`${browser.launchUrl}/full-title#3`);
        browser.assert.title(`3 ${mdash} title`);
        browser.end();
    },

    'does not update when moving forwards in `list` mode': (browser) => {
        browser.url(`${browser.launchUrl}/list-title#2`);
        browser.assert.title('title');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.title('title');
        browser.end();
    },

    'does not update when moving backwards in `list` mode': (browser) => {
        browser.url(`${browser.launchUrl}/list-title#2`);
        browser.assert.title('title');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.title('title');
        browser.end();
    },

    'updates when moving forwards in `full` mode': (browser) => {
        browser.url(`${browser.launchUrl}/full-title`);
        browser.assert.title(`1 ${mdash} title`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.title('title');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.title(`3 ${mdash} title`);
        browser.end();
    },

    'updates when moving backwards in `full` mode': (browser) => {
        browser.url(`${browser.launchUrl}/full-title#3`);
        browser.assert.title(`3 ${mdash} title`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.title('title');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.title(`1 ${mdash} title`);
        browser.end();
    },

    'updates when changing `list` to `full` mode': (browser) => {
        browser.url(`${browser.launchUrl}/list-title`);
        browser.assert.title('title');
        browser.click('[id="1"]');
        browser.assert.title(`1 ${mdash} title`);
        browser.end();
    },

    'updates when changing `full` to `list` mode': (browser) => {
        browser.url(`${browser.launchUrl}/full-title`);
        browser.assert.title(`1 ${mdash} title`);
        browser.sendKeys('.send-keys', browser.Keys.ESCAPE);
        browser.assert.title('title');
        browser.end();
    },
};
