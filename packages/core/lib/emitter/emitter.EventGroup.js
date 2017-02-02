shower.modules.define('emitter.EventGroup', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * @name emitter.EventGroup
     *
     * Helper.
     * It is extend of event emitter for more comfortable work with it.
     *
     * @param {event.Emitter} eventManager
     *
     * @example
     * MyClass = function (shower) {
     *      this._shower = shower;
     *
     *      this._message = "Hello";
     *      this._showerListeners = null;
     * };
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
    function EventGroup(eventManager) {
        this.events = eventManager;
        this._listeners = [];
    }

    extend(EventGroup.prototype, /** @lends event.EventGroup.prototype */ {
        /**
         * Add event listeners.
         *
         * @param {(string|string[])} types
         * @param {function} callback
         * @param {object} [context]
         * @returns {event.EventGroup}
         */
        on: function (types, callback, context) {
            if (Array.isArray(types)) {
                for (var i = 0, k = types.length; i < k; i++) {
                    this._listeners.push(types[i], callback, context);
                }
            } else {
                this._listeners.push(types, callback, context);
            }

            this.events.on(types, callback, context);

            return this;
        },

        /**
         * Remove event listeners.
         *
         * @param {(string|string[])} types
         * @param {function} callback
         * @param {object} context
         * @returns {event.EventGroup}
         */
        off: function (types, callback, context) {
            if (Array.isArray(types)) {
                for (var i = 0, k = types.length; i < k; i++) {
                    this._removeListener(types[i], callback, context);
                }
            } else {
                this._removeListener(types, callback, context);
            }

            return this;
        },

        /**
         * Remove all listeners.
         *
         * @returns {event.EventGroup}
         */
        offAll: function () {
            for (var i = 0, k = this._listeners.length; i < k; i += 3) {
                this.events.off(
                    this._listeners[i],
                    this._listeners[i + 1],
                    this._listeners[i + 2]
                );
            }
            this._listeners.length = 0;

            return this;
        },

        _removeListener: function (type, callback, context) {
            var index = this._listeners.indexOf(type, 0);
            while (index !== -1) {
                if (this._listeners[index + 1] === callback &&
                    this._listeners[index + 2] === context) {
                    this._listeners.splice(index, 3);

                    this.events.off(type, callback, context);
                }

                index = this._listeners.indexOf(type, index);
            }
        }
    });

    provide(EventGroup);
});
