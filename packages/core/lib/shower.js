import defaultOptions from './default-options';
import Slide from './slide';
import { EventTarget, defineReadOnly } from './utils';
import installModules from './modules/install';

const ensureSlideId = (slideElement, index) => {
    if (!slideElement.id) {
        slideElement.id = index + 1;
    }
};

class Shower extends EventTarget {
    constructor(options) {
        super();

        defineReadOnly(this, {
            options: { ...defaultOptions, ...options },
        });

        this._mode = 'list';
        this._isStarted = false;
        this._container = null;
    }

    /**
     * @param {object} options
     */
    configure(options) {
        Object.assign(this.options, options);
    }

    start() {
        if (this._isStarted) return;

        const { containerSelector } = this.options;
        this._container = document.querySelector(containerSelector);
        if (!this._container) {
            throw new Error(`Shower container with selector '${containerSelector}' not found.`);
        }

        this._initSlides();
        installModules(this);

        this._isStarted = true;
        this.dispatchEvent(new Event('start'));
    }

    _initSlides() {
        const slideElements = [
            ...this._container.querySelectorAll(this.options.slideSelector),
        ].filter((slideElement) => !slideElement.hidden);

        slideElements.forEach(ensureSlideId);
        this.slides = slideElements.map((slideElement) => {
            const slide = new Slide(slideElement, this.options);

            slide.addEventListener('activate', () => {
                this._changeActiveSlide(slide);
            });

            slide.addEventListener('fullmoderequest', () => {
                this.enterFullMode();
            });

            return slide;
        });
    }

    _changeMode(mode) {
        if (mode === this._mode) return;

        this._mode = mode;
        if (this._isStarted) {
            this.dispatchEvent(new Event('modechange'));
        }
    }

    _changeActiveSlide(next) {
        const prev = this.slides.find((slide) => {
            return slide.isActive && slide !== next;
        });

        if (prev) {
            prev.deactivate();
        }

        if (!this._isStarted) return;

        const event = new CustomEvent('slidechange', {
            detail: { prev },
        });

        this.dispatchEvent(event);
    }

    get container() {
        return this._container;
    }

    get isFullMode() {
        return this._mode === 'full';
    }

    get isListMode() {
        return this._mode === 'list';
    }

    get activeSlide() {
        return this.slides.find((slide) => slide.isActive);
    }

    get activeSlideIndex() {
        return this.slides.findIndex((slide) => slide.isActive);
    }

    /**
     * Slide fills the maximum area.
     */
    enterFullMode() {
        this._changeMode('full');
    }

    /**
     * Shower returns into list mode.
     */
    exitFullMode() {
        this._changeMode('list');
    }

    /**
     * @param {number} index
     */
    goTo(index) {
        const slide = this.slides[index];
        if (slide) {
            slide.activate();
        }
    }

    /**
     * @param {number} delta
     */
    goBy(delta) {
        this.goTo(this.activeSlideIndex + delta);
    }

    /**
     * @param {boolean=} isForce
     */
    prev(isForce) {
        const prev = new Event('prev', { cancelable: !isForce });
        if (this.dispatchEvent(prev)) {
            this.goBy(-1);
        }
    }

    /**
     * @param {boolean=} isForce
     */
    next(isForce) {
        const next = new Event('next', { cancelable: !isForce });
        if (this.dispatchEvent(next)) {
            this.goBy(1);
        }
    }

    first() {
        this.goTo(0);
    }

    last() {
        this.goTo(this.slides.length - 1);
    }
}

export default Shower;
