'use strict';

const TIMING = 1100;

function dispatchKeydown() {
    document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'a',
        }),
    );
}

module.exports = {
    '@tags': ['timer'],

    'does not activate on page load in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-timer#2`);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'does not activate when moving forwards in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-timer#1`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'does not activate when moving backwards in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-timer#3`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'activates on page load': browser => {
        browser.url(`${browser.launchUrl}/full-timer#2`);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'activates when moving forwards': browser => {
        browser.url(`${browser.launchUrl}/full-timer#1`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'activates when moving backwards': browser => {
        browser.url(`${browser.launchUrl}/full-timer#3`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'works only once': browser => {
        browser.url(`${browser.launchUrl}/full-timer#2`);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.cssClassPresent('[id="2"]', 'visited');
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    'gets cancelled by key press': browser => {
        browser.url(`${browser.launchUrl}/full-timer#2`);
        browser.execute(dispatchKeydown);
        browser.sendKeys('.send-keys', 'a');
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="2"]', 'active');
        browser.end();
    },

    '[nested steps] activates on page load': browser => {
        browser.url(`${browser.launchUrl}/full-timer-next#2`);
        browser.pause(TIMING);
        browser.assert.cssClassPresent('.a.next', 'active');
        browser.pause(TIMING);
        browser.assert.cssClassPresent('.b.next', 'active');
        browser.pause(TIMING);
        browser.assert.cssClassPresent('.c.next', 'active');
        browser.pause(TIMING);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    '[nested steps] gets cancelled by key press': browser => {
        browser.url(`${browser.launchUrl}/full-timer-next#2`);
        browser.execute(dispatchKeydown);
        browser.sendKeys('.send-keys', 'a');
        browser.pause(TIMING);
        browser.assert.cssClassNotPresent('.a.next', 'active');
        browser.end();
    },
};
