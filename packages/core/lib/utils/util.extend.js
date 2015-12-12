shower.modules.define('util.extend', function (provide) {
    /**
     * @ignore
     * @name util.extend
     * @function
     * @static
     * @param {object} target
     * @param {object} source
     * @return {object} Extended target object.
     */
    function extend(target) {
        if (!target) {
            throw new Error('util.extend: Target not found');
        }
        return (typeof Object.assign === 'undefined') ?
            polyfill.apply(null, arguments) :
            Object.assign.apply(null, arguments);
    }

    function polyfill(target) {
        for (var i = 1, l = arguments.length; i < l; i++) {
            var obj = arguments[i];
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    target[property] = obj[property];
                }
            }
        }
        return target;
    }

    provide(extend);
});
