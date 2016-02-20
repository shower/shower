/**
 * @file bind with memoization
 */
shower.modules.define('util.bound', function (provide) {

    /**
     * @name util.bound
     * @static
     * @function
     * @param {object} ctx Context.
     * @param {String} fn Function name.
     */
    function bound(ctx, fn) {
        return ctx['__bound_' + fn] || (ctx['__bound_' + fn] = ctx[fn].bind(ctx));
    };
    provide(bound);
});
