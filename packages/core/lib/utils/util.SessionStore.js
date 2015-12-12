shower.modules.define('util.SessionStore', [
    'util.Store',
    'util.inherit'
], function (provide, Store, inherit) {

    /**
     * @class
     * @name util.SessionStore
     * @augment util.Store
     * @param {string} storeKey Local storage item key.
     * @param {object} [initData].
     */
    function SessionStore(storeKey, initData) {
        this._storageKey = storeKey;
        var data = this._loadFromStorage() || initData;

        SessionStore.super.constructor.call(this, data);
    }

    inherit(SessionStore, Store, {
        set: function (key, value) {
            SessionStore.super.set.call(this, key, value);
            this._saveToStorage();
        },

        unset: function (key) {
            SessionStore.super.unset.call(this, key);
            this._saveToStorage();
        },

        _saveToStorage: function () {
            window.sessionStorage.setItem(
                this._storageKey,
                JSON.stringify(this.getAll())
            );
        },

        _loadFromStorage: function () {
            var store = window.sessionStorage.getItem(this._storageKey);
            return store && JSON.parse(store);
        }
    });

    provide(SessionStore);
});
