/**
 * @class
 * @name Plugins
 * Plugins controller for Shower.
 * @param {Shower} shower instance
 */
class Plugins {
    constructor(shower) {
        this._shower = shower;
        this._set = new Set();
    }

    /**
     * Add plugin to the Shower plugins system.
     *
     * @param {string} name Plugin module name.
     * @param {function} fn
     * @param {object} [options] Custom options for plugin.
     * @returns {Plugins}
     */
    add(name, fn, options) {
        if (this._set.has(name)) {
            throw new Error(`Plugin "shower-${name}" already exist.`);
        }

        if (!options) {
            options = this._shower.options[`plugin_shower-${name}`] || {};
        }

        if (fn.hasOwnProperty('prototype')) {
            new fn(this._shower, options); // eslint-disable-line new-cap, no-new
        } else {
            fn(this._shower, options);
        }

        return this;
    }
}

export default Plugins;
