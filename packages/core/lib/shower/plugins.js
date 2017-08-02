/**
 * @class
 * @name Plugins
 * Plugins controller for Shower.
 * @param {Shower} shower instance
 */
class Plugins {
    constructor(shower) {
        this._shower = shower;
        this._map = new Map();
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
        if (this._map.has(name)) {
            throw new Error(`Plugin "shower-${name}" already exist.`);
        }

        if (!options) {
            options = this._shower.options.get(`plugin_shower-${name}`) || {};
        }

        const plugin = fn.hasOwnProperty('prototype')
            ? new fn(this._shower, options) // eslint-disable-line new-cap
            : fn(this._shower, options);

        this._map.set(name, plugin);
        return this;
    }

    /**
     * Get plugin by name.
     *
     * @param {string} name Plugin name.
     * @returns {(object|undefined)} Instanced plugin.
     */
    get(name) {
        return this._map.get(name);
    }
}

export default Plugins;
