import Event from './event';
import EventGroup from './event-group';

/**
 * @param {string} type
 * @param {object} eventData
 * @param {object} target
 */
const createEventObject = (type, eventData, target) => {
    return new Event(Object.assign({ type, target }, eventData));
};

const callListeners = (listeners, event) => {
    listeners.sort((a, b) => a.priority - b.priority);

    for (const listener of listeners) {
        if (event.defaultPrevented()) break;

        listener.callback.call(listener.context, event);
    }
};

/**
 * @class
 * @name EventEmitter
 *
 * Event emitter. Handles events, emit custom events and other.
 *
 * @param {object} [params]
 * @param {object} [params.context]
 * @param {object} [params.parent]
 */
class EventEmitter {
    constructor(params = {}) {
        this._context = params.context;
        this._parent = params.parent;
        this._listeners = {};
    }

    /**
     * Add event (events) listener.
     *
     * @param {(string | string[])} types Event name or array of event names.
     * @param {function} callback
     * @param {object} [context] Callback context.
     * @param {number} [priority = 0]
     * @returns {EventEmitter}
     */
    on(types, callback, context, priority = 0) {
        if (typeof callback !== 'function') {
            throw new Error('Callback is not a function.');
        }

        [].concat(types).forEach(type => {
            this._addListener(type, callback, context, priority);
        });

        return this;
    }

    /**
     * Remove event (events) listener.
     *
     * @param {(string|string[])} types Event name or array of event names.
     * @param {function} callback
     * @param {object} [context] Callback context.
     * @param {number} [priority = 0]
     * @returns {EventEmitter}
     */
    off(types, callback, context, priority = 0) {
        [].concat(types).forEach(type => {
            this._removeListener(type, callback, context, priority);
        });

        return this;
    }

    /**
     * Add event listener. Callback will run once and after remove auto.
     *
     * @param {(string|string[])} eventType Event name or array of event names.
     * @param {function} callback
     * @param {object} [context] Callback context.
     * @returns {EventEmitter}
     */
    once(type, callback, context, priority) {
        const handler = event => {
            this.off(type, handler, this, priority);
            callback.call(context, event);
        };
        this.on(type, handler, this, priority);
        return this;
    }

    /**
     * Fire all handlers who listen that event type.
     *
     * @param {string} type
     * @param {(Event|object)} event
     */
    emit(type, event) {
        if (!event || typeof event.get !== 'function') {
            event = createEventObject(type, event, this._context);
        }

        if (event.isPropagationStopped()) return;

        if (this._listeners.hasOwnProperty(type)) {
            callListeners(this._listeners[type], event);
        }

        if (this._parent && !event.isPropagationStopped()) {
            this._parent.emit(type, event);
        }
    }

    /**
     * @param {EventEmitter} parent
     */
    setParent(parent) {
        this._parent = parent;
        return this;
    }

    /**
     * @returns {(EventEmitter|null)}
     */
    getParent() {
        return this._parent;
    }

    group() {
        return new EventGroup(this);
    }

    _addListener(type, callback, context, priority) {
        const listener = {
            callback,
            context,
            priority,
        };

        if (this._listeners.hasOwnProperty(type)) {
            this._listeners[type].push(listener);
        } else {
            this._listeners[type] = [listener];
        }
    }

    _removeListener(type, callback, context, priority) {
        const listeners = this._listeners[type] || [];
        const index = listeners.findIndex(listener => {
            return listener.callback === callback &&
                listener.context === context &&
                listener.priority === priority;
        });

        if (index === -1) return;

        listeners.splice(index, 1);
        if (!listeners.length) {
            this._clearType(type);
        }
    }

    /**
     * @ignore
     * @param {string} type
     */
    _clearType(type) {
        if (this._listeners.hasOwnProperty(type)) {
            delete this._listeners[type];
        }
    }
}

export default EventEmitter;
