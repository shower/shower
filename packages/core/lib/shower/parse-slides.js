import Slide from '../slide';

const ensureId = (slideElement, index) => {
    if (!slideElement.id) {
        slideElement.id = index + 1;
    }
};

/**
 * Get container and slide selector, returns array of slides.
 *
 * @param {HTMLElement} slideContainer
 * @param {string} slideSelector
 * @returns {Slide[]}
 */
export default (slideContainer, slideSelector) => {
    const slideElements = [...slideContainer.querySelectorAll(slideSelector)]
        .filter(slideElement => !slideElement.hidden);

    slideElements.forEach(ensureId);
    return slideElements.map(slideElement => new Slide(slideElement));
};
