shower.modules.define('util.Store', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * @name util.Store
     * @param {object} [initData={}].
     */
    function Store(initData) {
        this._data = initData || {};

        for (var i = 1, k = arguments.length; i < k; i++) {
            extend(this._data, arguments[i] || {});
        }
    }

    extend(Store.prototype, /** @lends Store.prototype */{
        /**
         * @param {string} key
         * @param {object} [defaultValue] Default value which returns if data is not definded.
         * @returns {object}
         */
        get: function (key, defaultValue) {
            return this._data.hasOwnProperty(key) ?
                this._data[key] :
                defaultValue;
        },

        /**
         * @returns {object} All contains data.
         */
        getAll: function () {
            return extend({}, this._data);
        },

        /**
         * @param {(string | object)} key Key or object with key-value data.
         * @param {object} [value]
         * @returns {Options} Self.
         */
        set: function (key, value) {
            this._data[key] = value;
            return this;
        },

        /**
         * @param {string} key
         * @returns {Options} Self.
         */
        unset: function (key) {
            if (!this._data.hasOwnProperty(key)) {
                throw new Error(key + ' not found.');
            }

            delete this._data[key];
            return this;
        },

        destroy: function () {
            this._data = {};
        }
    });

    provide(Store);
});
