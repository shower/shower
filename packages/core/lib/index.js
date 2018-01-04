import 'shim-keyboard-event-key';
import { Shower, defaultOptions } from './shower';
import Keys from './plugins/keys';
import Title from './plugins/title';
import Location from './plugins/location';
import Next from './plugins/next';
import Progress from './plugins/progress';
import Timer from './plugins/timer';
import Touch from './plugins/touch';
import a11y from './plugins/a11y';

export let shower; // eslint-disable-line

const dataAttrsOptions = [
    'debug-mode',
    'slides-selector',
];

const hasOptions = typeof showerOptions !== 'undefined';
const options = hasOptions ? showerOptions : {};
const containerSelector = options.shower_selector || defaultOptions.container_selector;
const container = document.querySelector(containerSelector);
if (!container) {
    throw new Error(`Shower container with selector ${containerSelector} not found.`);
}

const autoInit = 'auto_init' in options ? options.auto_init : true;
if ((hasOptions && autoInit) || container.dataset.autoInit !== 'false') {
    if (!hasOptions) {
        dataAttrsOptions.forEach(name => {
            const value = container.getAttribute(`data-${name}`);
            if (value !== null) {
                options[name.replace(/-/g, '_')] = value;
            }
        });
    }

    shower = new Shower(container, options);
    shower.plugins
        .add('keys', Keys)
        .add('title', Title)
        .add('location', Location)
        .add('next', Next)
        .add('progress', Progress)
        .add('timer', Timer)
        .add('touch', Touch)
        .add('a11y', a11y);
}
