'use strict';
module.exports = {
    '@tags': ['keys'],

    // Forward

    'activates the first slide in `list` mode if Right Arrow key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html`);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves forward when Right Arrow key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ARROW_RIGHT);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when Down Arrow key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ARROW_DOWN);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when Page Down key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.PAGEDOWN);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when J key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys('J');
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when L key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys('L');
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when N key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys('N');
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when Enter key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.ENTER);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves forward when Space key is pressed in `full` mode': browser => {
        browser.url(`file:///${__dirname}/full.html#1`);
        browser.keys(browser.Keys.SPACE);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'doesn’t move forward when Space key is pressed in `list` mode': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.SPACE);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    // Backward

    'moves backward when Left Arrow key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys(browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when Up Arrow key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys(browser.Keys.ARROW_UP);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when Page Up key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys(browser.Keys.PAGEUP);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when K key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys('K');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when H key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys('H');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when P key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys('P');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when Shift Enter keys are pressed in `list` mode': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys([browser.Keys.SHIFT, browser.Keys.ENTER]);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'moves backward when Shift Enter keys are pressed in `full` mode': browser => {
        browser.url(`file:///${__dirname}/full.html#2`);
        browser.keys([browser.Keys.SHIFT, browser.Keys.ENTER]);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'doesn’t move backward when Shift Space keys are pressed in `list` mode': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys([browser.Keys.SHIFT, browser.Keys.SPACE]);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'moves backward when Shift Space keys are pressed in `full` mode': browser => {
        browser.url(`file:///${__dirname}/full.html#2`);
        browser.keys([browser.Keys.SHIFT, browser.Keys.SPACE]);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'goes to first slide when Home key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#3`);
        browser.keys(browser.Keys.HOME);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'goes to last slide when End key is pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#1`);
        browser.keys(browser.Keys.END);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    // Start End

    'starts presenation from the current slide when Shift F5 keys are pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys([browser.Keys.SHIFT, browser.Keys.F5]);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'starts presenation from the first slide when Cmd Shift Enter keys are pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys([browser.Keys.META, browser.Keys.SHIFT, browser.Keys.ENTER]);
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'starts presenation from the current slide when Cmd Enter keys are pressed': browser => {
        browser.url(`file:///${__dirname}/list.html#2`);
        browser.keys([browser.Keys.META, browser.Keys.ENTER]);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.assert.elementPresent('.shower.full');
        browser.end();
    },

    'stops presenation when Esc key is pressed': browser => {
        browser.url(`file:///${__dirname}/full.html#1`);
        browser.keys(browser.Keys.ESCAPE);
        browser.assert.elementPresent('.shower.list');
        browser.end();
    },
};
