import { contentLoaded } from './utils.js';
import Shower from './shower.js';

const options = document.currentScript.dataset;
const shower = new Shower(options);

Object.defineProperty(window, 'shower', {
	value: shower,
	configurable: true,
});

contentLoaded(() => {
	shower.start();
});
