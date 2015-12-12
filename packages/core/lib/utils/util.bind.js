/**
 * @file Simple bind without currying.
 */
shower.modules.define('util.bind', function (provide) {

    /**
     * @name util.bind
     * @static
     * @function
     * @param {function} fn Function.
     * @param {object} ctx Context.
     */
    var bind = typeof Function.prototype.bind === 'function' ?
        function (fn, ctx) {
            return fn.bind(ctx);
        } :
        function (fn, ctx) {
            if (arguments.length > 2) {
                var prependArgs = Array.prototype.slice.call(arguments, 2);
                var args = Array.prototype.slice.call(arguments);
                return function () {
                    return fn.apply(ctx, [].concat(prependArgs, args));
                };
            } else {
                return function () {
                    return fn.apply(ctx, arguments);
                };
            }
        };

    provide(bind);
});
