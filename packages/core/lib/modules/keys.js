import { isInteractiveElement } from '../utils';

export default (shower) => {
    const doSlideActions = (event) => {
        const isShowerAction = !(event.ctrlKey || event.altKey || event.metaKey);

        switch (event.key.toUpperCase()) {
            case 'ENTER':
                if (event.metaKey && shower.isListMode) {
                    if (event.shiftKey) {
                        event.preventDefault();
                        shower.first();
                    }

                    break;
                }

                event.preventDefault();
                if (event.shiftKey) {
                    shower.prev();
                } else {
                    shower.next();
                }
                break;

            case 'BACKSPACE':
            case 'PAGEUP':
            case 'ARROWUP':
            case 'ARROWLEFT':
            case 'H':
            case 'K':
            case 'P':
                if (isShowerAction) {
                    event.preventDefault();
                    shower.prev(event.shiftKey);
                }
                break;

            case 'PAGEDOWN':
            case 'ARROWDOWN':
            case 'ARROWRIGHT':
            case 'L':
            case 'J':
            case 'N':
                if (isShowerAction) {
                    event.preventDefault();
                    shower.next(event.shiftKey);
                }
                break;

            case ' ':
                if (isShowerAction && shower.isFullMode) {
                    event.preventDefault();
                    if (event.shiftKey) {
                        shower.prev();
                    } else {
                        shower.next();
                    }
                }
                break;

            case 'HOME':
                event.preventDefault();
                shower.first();
                break;

            case 'END':
                event.preventDefault();
                shower.last();
                break;
        }
    };

    const doModeActions = (event) => {
        switch (event.key.toUpperCase()) {
            case 'ESCAPE':
                if (shower.isFullMode) {
                    event.preventDefault();
                    shower.exitFullMode();
                }
                break;

            case 'ENTER':
                if (event.metaKey && shower.isListMode) {
                    event.preventDefault();
                    shower.enterFullMode();
                }
                break;

            case 'P':
                if (event.metaKey && event.altKey && shower.isListMode) {
                    event.preventDefault();
                    shower.enterFullMode();
                }
                break;

            case 'F5':
                if (event.shiftKey && shower.isListMode) {
                    event.preventDefault();
                    shower.enterFullMode();
                }
                break;
        }
    };

    shower.container.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) return;
        if (isInteractiveElement(event.target)) return;

        doSlideActions(event);
        doModeActions(event);
    });
};
