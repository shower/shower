/**
 * @file Plugins controller for Shower.
 */
shower.modules.define('Plugins', [
    'Emitter',
    'util.extend'
], function (provide, EventEmitter, extend) {

    /**
     * @class
     * @name shower.Plugins
     *
     * Plugins controller for Shower.
     *
     * @param {shower.global} shower global module.
     */
    function Plugins(showerGlobal) {
        this.events = new EventEmitter({
            context: this
        });

        this._showerGlobal = showerGlobal;
        this._showerInstances = showerGlobal.getInited();

        this._plugins = {};
        this._instances = [];

        showerGlobal.events.on('init', this._onShowerInit, this);
    }

    extend(Plugins.prototype, /** @lends shower.Plugins.prototype */ {

        destroy: function () {
            this._showerGlobal.events.off('init', this._onShowerInit, this);

            this._plugins = null;
        },

        /**
         * Add plugin to the Shower plugins system.
         *
         * @param {string} name Plugin module name.
         * @param {object} [options] Custom options for plugin.
         * @returns {shower.Plugins}
         */
        add: function (name, options) {
            if (this._plugins.hasOwnProperty(name)) {
                throw new Error('Plugin ' + name + ' already exist.');
            }

            this._requireAndAdd({
                name: name,
                options: options
            });

            return this;
        },

        /**
         * Remove plugin from system.
         *
         * @param {String} name
         * @returns {shower.Plugins}
         */
        remove: function (name) {
            if (!this._plugins.hasOwnProperty(name)) {
                throw new Error('Plugin ' + name + ' not found.');
            }

            delete this._plugins[name];

            this.events.emit('remove', {
                name: name
            });

            return this;
        },

        /**
         * Get plugin by name.
         *
         * @param {string} name Plugin name.
         * @param {Shower} [shower] Shower instance.
         * @returns {(object|null)} Instanced plugin or plugin class if shower var is not defined.
         */
        get: function (name, shower) {
            var plugin = this._plugins[name];
            var pluginInstance;

            if (plugin && shower) {
                for (var i = 0, l = this._instances.length; i < l; i++) {
                    var instanceInfo = this._instances[i];
                    if (instanceInfo.plugin.name === name &&
                        instanceInfo.shower === shower) {
                        pluginInstance = instanceInfo.instance;
                    }
                }
            }

            return pluginInstance;
        },

        _requireAndAdd: function (plugin) {
            shower.modules.require(plugin.name, function (pluginClass) {
                plugin.Class = pluginClass;
                this._plugins[plugin.name] = plugin;
                this._instancePlugin(plugin);
            }.bind(this));
        },

        _instancePlugin: function (plugin) {
            this._showerInstances.forEach(function (shower) {
                this._instance(plugin, shower);
            }, this);

            this.events.emit('add', {
                name: plugin.name
            });
        },

        _instanceFor: function (shower) {
            for (var name in this._plugins) {
                if (this._plugins.hasOwnProperty(name)) {
                    this._instance(this._plugins[name], shower);
                }
            }
        },

        _instance: function (plugin, shower) {
            var options = plugin.options || shower.options.get('plugin_' + plugin.name);
            this._instances.push({
                shower: shower,
                plugin: plugin,
                instance: new plugin.Class(shower, options)
            });
        },

        _onShowerInit: function (event) {
            var shower = event.get('shower');
            this._instanceFor(shower);
        }
    });

    provide(Plugins);
});
