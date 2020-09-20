export const isInteractiveElement = (element) => element.tabIndex !== -1;

export const contentLoaded = (callback) => {
    if (document.currentScript.async) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};

export const defineReadOnly = (target, props) => {
    for (const [key, value] of Object.entries(props)) {
        Object.defineProperty(target, key, {
            value,
            writable: false,
            enumerable: true,
            configurable: true,
        });
    }
};

export class ShowerError extends Error {}
