import { isInteractiveElement, isModifierUsed } from '../utils';

export default shower => {
    const { container, player } = shower;
    const containerElement = container.getElement();
    containerElement.addEventListener('keydown', event => {
        if (event.defaultPrevented) return;
        if (isInteractiveElement(event.target)) return;

        slideActions(event);
        modeActions(event);
    });

    const slideActions = event => {
        switch (event.key.toUpperCase()) {
            case 'ENTER':
                if (event.metaKey && !container.isSlideMode()) {
                    if (event.shiftKey) {
                        event.preventDefault();
                        player.first();
                    }

                    break;
                }

                event.preventDefault();
                if (event.shiftKey) {
                    player.prev();
                } else {
                    player.next();
                }
                break;

            case 'PAGEUP':
            case 'ARROWUP':
            case 'ARROWLEFT':
            case 'H':
            case 'K':
            case 'P':
                if (!isModifierUsed(event)) {
                    event.preventDefault();
                    player.prev({ cancelable: event.shiftKey });
                }
                break;

            case 'PAGEDOWN':
            case 'ARROWDOWN':
            case 'ARROWRIGHT':
            case 'L':
            case 'J':
            case 'N':
                if (!isModifierUsed(event)) {
                    event.preventDefault();
                    player.next({ cancelable: event.shiftKey });
                }
                break;

            case ' ':
                if (!isModifierUsed(event) && container.isSlideMode()) {
                    event.preventDefault();
                    if (event.shiftKey) {
                        player.prev();
                    } else {
                        player.next();
                    }
                }
                break;

            case 'HOME':
                event.preventDefault();
                player.first();
                break;

            case 'END':
                event.preventDefault();
                player.last();
                break;
        }
    };

    const modeActions = event => {
        switch (event.key.toUpperCase()) {
            case 'ESCAPE':
                if (container.isSlideMode()) {
                    event.preventDefault();
                    container.exitSlideMode();
                }
                break;

            case 'ENTER':
                if (event.metaKey && !container.isSlideMode()) {
                    event.preventDefault();
                    container.enterSlideMode();
                }
                break;

            case 'P':
                if (event.metaKey && event.altKey && !container.isSlideMode()) {
                    event.preventDefault();
                    container.enterSlideMode();
                }
                break;

            case 'F5':
                if (event.shiftKey && !container.isSlideMode()) {
                    event.preventDefault();
                    container.enterSlideMode();
                }
                break;
        }
    };
};
