/**
 * @fileOverview Slides parser.
 */
shower.modules.define('shower.slidesParser', [
    'Slide'
], function (provide, Slide) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @function
     * Get container and slide selector, myst returns array of slides.
     * @name shower.slidesParser
     *
     * @param {HTMLElement} containerElement
     * @param {string} cssSelector
     * @returns {Slide[]}
     */
    function parse(containerElement, cssSelector) {
        var slidesElements = containerElement.querySelectorAll(cssSelector);
        slidesElements = Array.prototype.slice.call(slidesElements);

        return slidesElements.map(function (slideElement, index) {
            var slide = new Slide(slideElement);

            if (!slideElement.id) {
                slideElement.id = index + 1;
            }

            return slide;
        });
    }

    provide(parse);
});
