/**
 * @file Layout factory for slides.
 */
shower.modules.define('slide.layoutFactory', [
    'slide.Layout',
    'util.extend'
], function (provide, SlideLayout, extend) {

    /**
     * @name slide.layoutFactory
     * @static
     */
    var layoutFactory = {};

    extend(layoutFactory, /** @lends slide.layoutFactory */ {
        /**
         * @static
         * @function
         *
         * @param {object} [parameters]
         * @param {string} [parameters.content] Slide content.
         * @param {string} [parameters.contentType='slide'] Cover, slide, image.
         * @returns {slide.Layout}
         */
        createLayout: function (parameters) {
            parameters = parameters || {};

            var element = layoutFactory._createElement(extend({
                content: '',
                contentType: 'slide'
            }, parameters));

            return new SlideLayout(element);
        },

        /**
         * @ignore
         * @param options
         * @returns {HTMLElement}
         */
        _createElement: function (options) {
            var element = document.createElement('section');
            element.innerHTML = options.content;
            element.classList.add(options.contentType);

            return element;
        }
    });

    provide(layoutFactory);
});
