/**
 * @class
 * @name Event
 *
 * Event class. Can contains custom data.
 *
 * @param {object} data Custom event data.
 */
class Event {
    constructor(data = {}) {
        this._data = data;
        this._preventDefault = false;
        this._stopPropagation = false;
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    get(key) {
        return this._data[key];
    }

    preventDefault() {
        this._preventDefault = true;
        return this._preventDefault;
    }

    defaultPrevented() {
        return this._preventDefault;
    }

    stopPropagation() {
        this._stopPropagation = true;
        return this._stopPropagation;
    }

    isPropagationStopped() {
        return this._stopPropagation;
    }
}

export default Event;
