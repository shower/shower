import Slide from '../slide';

/**
 * @function
 * Get container and slide selector, myst returns array of slides.
 * @name slidesParser
 *
 * @param {HTMLElement} containerEl
 * @param {string} slidesSel
 * @returns {Slide[]}
 */
export default (containerEl, slidesSel) => {
    const slidesEls = containerEl.querySelectorAll(slidesSel);

    return Array.from(slidesEls, (slideEl, index) => {
        const slide = new Slide(slideEl);

        if (!slideEl.id) {
            slideEl.id = index + 1;
        }

        return slide;
    });
};
