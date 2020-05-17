export { default as EventTarget } from './event-target';
export const isInteractiveElement = (element) => element.tabIndex !== -1;

export const contentLoaded = (callback) => {
    if (document.currentScript.async) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};
