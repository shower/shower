'use strict';

const fs = require('fs');

const html = fs.readFileSync('test/unit.html', 'utf-8');

require('jsdom-global')(html);

const dashCase = key => {
    return key.replace(/([a-z])([A-Z])/, (_, e, s) => {
        return `${e}-${s.toLowerCase()}`;
    });
};

Object.defineProperty(Element.prototype, 'dataset', {
    get() {
        return new Proxy({}, {
            get: (_, key) => {
                const attr = `data-${dashCase(key)}`;
                return this.getAttribute(attr);
            },
        });
    },
    enumerable: true,
    configurable: true,
});

global.sessionStorage = {
    getItem(key) {
        return this[key];
    },
    setItem(key, value) {
        this[key] = value;
    },
};

require('chai').use(require('chai-dom'));
require('chai/register-should');
require('babel-register');
