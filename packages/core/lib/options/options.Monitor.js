/**
 * @fileOverview Changes monitoring in options.
 */
shower.modules.define('options.Monitor', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class Monitoring fields change.
     * @name options.Monitor
     * @param {Options} options
     */
    function Monitor(options) {
        this._options = options;
        this._optionsEvents = options.events.group()
            .on(['set', 'unset'], this._onOptionsChange, this);

        this._fieldsHanders = {};
    }

    extend(Monitor.prototype, /** @lends options.Monitor.prototype */{

        destroy: function () {
            this._options = null;
            this._optionsEvents.offAll();
            this._fieldsHanders = null;
        },

        /**
         * @param {(string|string[])} field
         * @param {function} callback
         * @param {Object} [context]
         * @returns {options.Monitor} Self.
         */
        add: function (field, callback, context) {
            if (Array.prototype.isArray.call(null, field)) {
                var fields = field;
                for (var fieldName in fields) {
                    if (fields.hasOwnProperty(fieldName)) {
                        this._addHandler(fieldName, callback, context);
                    }
                }
            } else {
                this._addHandler(field, callback, context);
            }

            return this;
        },

        /**
         * @param {(string|string[])} field
         * @param {function} callback
         * @param {object} [context]
         * @returns {options.Monitor} Self.
         */
        remove: function (field, callback, context) {
            if (Array.prototype.isArray.call(null, field)) {
                var fields = field;
                for (var fieldName in fields) {
                    if (fields.hasOwnProperty(fieldName)) {
                        this._removeHandler(fieldName, callback, context);
                    }
                }
            } else {
                this._removeHandler(field, callback, context);
            }

            return this;
        },

        /**
         * @returns {Options} Options.
         */
        getOptions: function () {
            return this._options;
        },

        _onOptionsChange: function (event) {
            var fieldsUpdated = event.get('type') === 'unset' ?
                [event.get('name')] :
                event.get('items');

            fieldsUpdated.forEach(function (field) {
                if (this._fieldsHanders.hasOwnProperty(field)) {
                    this._fieldsHanders[field].forEach(function (handler) {
                        handler.callback.call(handler.context, this._options.get(field));
                    });
                }
            }, this);
        },

        _addHandler: function (fieldName, callback, context) {
            var handler = {
                callback: callback,
                context: context
            };

            if (this._fieldsHanders.hasOwnProperty(fieldName)) {
                this._fieldsHanders[fieldName].push(handler);
            } else {
                this._fieldsHanders[fieldName] = [handler];
            }
        },

        _removeHandler: function (field, callback, context) {
            if (!this._fieldsHanders.hasOwnProperty(field)) {
                throw new Error('Remove undefined handler for ' + field + ' field');
            }

            var fieldsHanders = this._fieldsHanders[field];
            var handler = fieldsHanders.filter(function (hander) {
                return hander.callback === callback && hander.context === context;
            })[0];

            if (!handler) {
                throw new Error('Hanlder for ' + field + ' not found.');
            }

            fieldsHanders.splice(fieldsHanders.indexOf(handler, 1));
        }
    });

    provide(Monitor);
});
