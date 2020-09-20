import defaultOptions from './default-options';
import Slide from './slide';
import { defineReadOnly, ShowerError } from './utils';
import installModules from './modules/install';

class Shower extends EventTarget {
    /**
     * @param {object=} options
     */
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
     * @param {object=} options
     * @throws {ShowerError}
     */
    configure(options) {
        if (this._isStarted) {
            throw new ShowerError('Shower should be configured before it is started.');
        }

        Object.assign(this.options, options);
    }

    /**
     * @throws {ShowerError}
     * @emits Shower#start
     */
    start() {
        if (this._isStarted) return;

        const { containerSelector } = this.options;
        this._container = document.querySelector(containerSelector);
        if (!this._container) {
            throw new ShowerError(
                `Shower container with selector '${containerSelector}' was not found.`,
            );
        }

        this._initSlides();
        installModules(this);

        this._isStarted = true;
        this.dispatchEvent(new Event('start'));
    }

    _initSlides() {
        const visibleSlideSelector = `${this.options.slideSelector}:not([hidden])`;
        const visibleSlideElements = this._container.querySelectorAll(visibleSlideSelector);

        this.slides = Array.from(visibleSlideElements, (slideElement, index) => {
            if (!slideElement.id) {
                slideElement.id = index + 1;
            }

            return new Slide(this, slideElement);
        });
    }

    _setMode(mode) {
        if (mode === this._mode) return;

        this._mode = mode;
        this.dispatchEvent(new Event('modechange'));
    }

    /**
     * @param {Event} event
     */
    dispatchEvent(event) {
        if (!this._isStarted) return false;

        return super.dispatchEvent(event);
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
     * @emits Shower#modechange
     */
    enterFullMode() {
        this._setMode('full');
    }

    /**
     * Shower returns into list mode.
     * @emits Shower#modechange
     */
    exitFullMode() {
        this._setMode('list');
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
     * @param {boolean} [isForce=false]
     * @emits Shower#prev
     */
    prev(isForce) {
        const prev = new Event('prev', { cancelable: !isForce });
        if (this.dispatchEvent(prev)) {
            this.goBy(-1);
        }
    }

    /**
     * @param {boolean} [isForce=false]
     * @emits Shower#next
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
