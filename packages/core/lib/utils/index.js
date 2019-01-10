export { default as EventTarget } from './event-target';
export const isInteractiveElement = element => element.tabIndex !== -1;
export const freezeHistory = callback => {
    history.pushState = () => {};
    history.replaceState = () => {};

    try {
        callback();
    } finally {
        delete history.pushState;
        delete history.replaceState;
    }
};
