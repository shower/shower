/**
 * @file Event emitter.
 */
shower.modules.define('Emitter', [
    'emitter.Event',
    'emitter.EventGroup',
    'util.extend'
], function (provide, EmitterEvent, EventGroup, extend) {

    /**
     * @class
     * @name emitter.Emitter
     *
     * Event emitter. Handle events, emit custom events and other.
     *
     * @param {object} [parameters]
     * @param {object} [parameters.context]
     * @param {object} [parameters.parent]
     */
    function EventEmitter(parameters) {
        parameters = parameters || {};

        this._context = parameters.context;
        this._parent = parameters.parent;

        this._listeners = {};
    }

    extend(EventEmitter.prototype, /** @lends Emitter.prototype */ {

        /**
         * Add event (events) listener.
         *
         * @param {(string | string[])} types Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @param {number} [priority = 0]
         * @returns {Emitter}
         */
        on: function (types, callback, context, priority) {
            if (typeof callback === 'undefined') {
                throw new Error('Callback is not defined.');
            }

            priority = priority || 0;

            if (typeof types === 'string') {
                this._addListener(types, callback, context, priority);
            } else {
                for (var i = 0, l = types.length; i < l; i++) {
                    this._addListener(types[i], callback, context, priority);
                }
            }
            return this;
        },

        /**
         * Remove event (events) listener.
         *
         * @param {(string|string[])} types Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @param {number} [priority = 0]
         * @returns {Emitter}
         */
        off: function (types, callback, context, priority) {
            priority = priority || 0;

            if (typeof types === 'string') {
                this._removeListener(types, callback, context, priority);
            } else {
                for (var i = 0, l = types.length; i < l; i++) {
                    this._removeListener(types[i], callback, context, priority);
                }
            }

            return this;
        },

        /**
         * Add event listener. Callback will run once and after remove auto.
         *
         * @param {(string|string[])} eventType Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @returns {Emitter}
         */
        once: function (eventType, callback, context, priority) {
            var handler = function (event) {
                this.off(eventType, handler, this, priority);
                if (context) {
                    callback.call(context, event);
                } else {
                    callback(event);
                }
            };
            this.on(eventType, handler, this, priority);
            return this;
        },

        /**
         * Fire all handlers who listen that event type.
         *
         * @param {string} eventType
         * @param {(event.Event|object)} eventObject
         */
        emit: function (eventType, eventObject) {
            var event = eventObject;
            var listeners = this._listeners;

            if (!event || typeof event.get !== 'function') {
                event = this.createEventObject(eventType, eventObject, this._context);
            }

            if (!event.isPropagationStopped()) {
                if (listeners.hasOwnProperty(eventType)) {
                    this._callListeners(listeners[eventType], event);
                }

                if (this._parent && !event.isPropagationStopped()) {
                    this._parent.emit(eventType, event);
                }
            }
        },

        /**
         * @param {string} type
         * @param {object} eventData
         * @param {object} target
         */
        createEventObject: function (type, eventData, target) {
            var data = {
                target: target,
                type: type
            };

            return new EmitterEvent(eventData ? extend(data, eventData) : data);
        },

        /**
         * @param {Emitter} parent
         */
        setParent: function (parent) {
            if (this._parent !== parent) {
                this._parent = parent;
            }
        },

        /**
         * @returns {(Emitter|null)}
         */
        getParent: function () {
            return this._parent;
        },

        group: function () {
            return new EventGroup(this);
        },

        _addListener: function (eventType, callback, context, priority) {
            var listener = {
                callback: callback,
                context: context,
                priority: priority
            };

            if (this._listeners[eventType]) {
                this._listeners[eventType].push(listener);
            } else {
                this._listeners[eventType] = [listener];
            }
        },

        _removeListener: function (eventType, callback, context, priority) {
            var listeners = this._listeners[eventType];
            var listener;

            if (listeners) {
                var foundIndex = -1;
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listener = listeners[i];

                    if (listener.callback === callback &&
                        listener.context === context &&
                        listener.priority === priority) {

                        foundIndex = i;
                    }
                }

                if (foundIndex !== -1) {
                    if (listeners.length === 1) {
                        this._clearType(eventType);
                    } else {
                        listeners.splice(foundIndex, 1);
                    }
                }
            }
        },

        /**
         * @ignore
         * @param {string} eventType
         */
        _clearType: function (eventType) {
            if (this._listeners.hasOwnProperty(eventType)) {
                delete this._listeners[eventType];
            }
        },

        _callListeners: function (listeners, event) {
            var i = listeners.length - 1;

            // Sort listeners by priority
            listeners.sort(sortByPriority);

            while (i >= 0 && !event.defaultPrevented()) {
                var listener = listeners[i];
                if (listener) {
                    if (listener.context) {
                        listener.callback.call(listener.context, event);
                    } else {
                        listener.callback(event);
                    }
                }
                i--;
            }
        }
    });

    function sortByPriority(aListener, bListener) {
        return aListener.priority - bListener.priority;
    }

    provide(EventEmitter);
});
