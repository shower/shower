// Function.bind polyfill
if (typeof (function () {}).bind === 'undefined') {
    Function.prototype.bind = function (ctx) {
        var fn = this;
        if (arguments.length > 1) {
            var prependArgs = Array.prototype.slice.call(arguments, 1);
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
}
