/**
 * @class
 * @name EventGroup
 *
 * Helper.
 * It is extend of event emitter for more comfortable work with it.
 *
 * @param {Emitter} events
 *
 * @example
 * function MyClass(shower) {
 *      this._shower = shower;
 *
 *      this._message = "Hello";
 *      this._showerListeners = null;
 * }
 *
 * MyClass.prototype.setupListeners = function () {
 *      this._showerListeners = this._shower.events.group()
 *          .on("next", function () { console.log(this._message); }, this)
 *          .on("prev", function () { console.log(this._message); }, this);
 * };
 *
 * MyClass.prototype.clearListeners = function () {
 *      this._showerListeners.offAll();
 * };
 */
class EventGroup {
    constructor(events) {
        this.events = events;
        this._listeners = [];
    }

    /**
     * Add event listeners.
     *
     * @param {(string|string[])} types
     * @param {function} callback
     * @param {object} [context]
     * @returns {event.EventGroup}
     */
    on(types, callback, context, priority) {
        [].concat(types).forEach(type => {
            this._listeners.push(type, callback, context, priority);
        });

        this.events.on(types, callback, context, priority);
        return this;
    }

    /**
     * Remove event listeners.
     *
     * @param {(string|string[])} types
     * @param {function} callback
     * @param {object} context
     * @returns {event.EventGroup}
     */
    off(types, callback, context) {
        [].concat(types).forEach(type => {
            this._removeListener(type, callback, context);
        });

        return this;
    }

    /**
     * Remove all listeners.
     *
     * @returns {event.EventGroup}
     */
    offAll() {
        for (let i = 0; i < this._listeners.length; i += 3) {
            this.events.off(
                this._listeners[i],
                this._listeners[i + 1],
                this._listeners[i + 2]
            );
        }

        this._listeners = [];
        return this;
    }

    _removeListener(type, callback, context) {
        let index = this._listeners.indexOf(type);
        while (index !== -1) {
            if (this._listeners[index + 1] === callback &&
                this._listeners[index + 2] === context) {
                this._listeners.splice(index, 3);
                this.events.off(type, callback, context);
            }

            index = this._listeners.indexOf(type, index);
        }
    }
}

export default EventGroup;
