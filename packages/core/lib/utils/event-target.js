const EVENT_TARGET = Symbol('EventTarget');

class EventTarget {
    constructor() {
        this[EVENT_TARGET] = document.createElement('div');
    }

    addEventListener(...args) {
        this[EVENT_TARGET].addEventListener(...args);
    }

    removeEventListener(...args) {
        this[EVENT_TARGET].removeEventListener(...args);
    }

    dispatchEvent(event) {
        Object.defineProperties(event, {
            target: { value: this },
            currentTarget: { value: this },
        });

        return this[EVENT_TARGET].dispatchEvent(event);
    }
}

export default EventTarget;
