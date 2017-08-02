/**
 * @class
 * @name Store
 */
class Store {
    constructor(...args) {
        this._data = Object.assign({}, ...args);
    }

    /**
     * @param {string} key
     * @param {object} [defaultValue] Default value which returns if data is not definded.
     * @returns {object}
     */
    get(key, defaultValue) {
        return this._data.hasOwnProperty(key) ?
            this._data[key] :
            defaultValue;
    }

    /**
     * @returns {object} All contains data.
     */
    getAll() {
        return Object.assign({}, this._data);
    }

    /**
     * @param {string} key
     * @param {object} [value]
     * @returns {Options} Self.
     */
    set(key, value) {
        this._data[key] = value;
        return this;
    }

    /**
     * @param {string} key
     * @returns {Options} Self.
     */
    unset(key) {
        if (!this._data.hasOwnProperty(key)) {
            throw new Error(`${key} not found.`);
        }

        delete this._data[key];
        return this;
    }

    destroy() {
        this._data = {};
    }
}

export default Store;
