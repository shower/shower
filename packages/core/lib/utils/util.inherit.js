shower.modules.define('util.inherit', [
    'util.extend'
], function (provide, extend) {

    /**
     * @ignore
     * Inherit function.
     * @name util.inherit
     * @function
     * @static
     * @param {function} childClass
     * @param {function} parentClass
     * @param {object} [override]
     * @returns {object} Child class prototype.
     *
     * @example
     * function CrazySlide(content, options) {
     *      CrazySlide.super.constructor.call(this, content, options);
     *      …
     * }
     * inherit(CrazySlide, Slide, {
     *     _haveFun: function () {
     *         alert('fun');
     *     }
     * });
     */
    var inherit = function (childClass, parentClass, override) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
        childClass.super = parentClass.prototype;
        childClass.super.constructor = parentClass;

        if (override) {
            extend(childClass.prototype, override);
        }
        return childClass.prototype;
    };

    provide(inherit);
});
