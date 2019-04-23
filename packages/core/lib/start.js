import { contentLoaded } from './utils';
import Shower from './shower';

const options = document.currentScript.dataset;
const shower = new Shower(options);

Object.defineProperty(window, 'shower', {
    value: shower,
    configurable: true,
});

contentLoaded(() => {
    shower.start();
});
