(function (global) {
    var dataAttrsOptions = [
        'debug-mode',
        'slides-selector',
        'hotkeys'
    ];

    global.shower = {
        modules: modules.create(),
        options: global.showerOptions || {}
    };

    if (/interactive|complete|loaded/.test(document.readyState)) {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }

    function initialize() {
        global.shower.modules.require('shower.defaultOptions', function (defaultOptions) {
            var hasOptions = global.hasOwnProperty('showerOptions');
            var options = global.shower.options;
            var containerSelector = options.shower_selector || defaultOptions.container_selector;
            var element = document.querySelector(containerSelector);
            var getDataAttr = getData.bind(this, element);
            var autoInit = typeof options.auto_init !== 'undefined' ?
                options.auto_init : true;

            if (!element) {
                throw new Error('Shower element with selector ' + containerSelector + ' not found.');
            }

            if (getDataAttr('auto-init') !== 'false' || (hasOptions && autoInit)) {
                if (!hasOptions) {
                    dataAttrsOptions.forEach(function (name) {
                        var value = getDataAttr(name);
                        // Null for getAttr, undefined for dataset.
                        if (value !== null && typeof value !== 'undefined') {
                            options[name.replace(/-/g, '_')] = value;
                        }
                    });
                }

                global.shower.modules.require(['shower'], function (sh) {
                    sh.init({
                        container: element,
                        options: options
                    });
                });
            }
        });
    };

    /**
     * Get data-attr value.
     * @param {HTMLElement} element
     * @param {String} name Data property
     * @returns {Object}
     */
    function getData(element, name) {
        return element.dataset ?
            element.dataset[name] :
            element.getAttribute('data-' + name);
    }
})(window);
