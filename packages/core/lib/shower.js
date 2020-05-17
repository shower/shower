import defaultOptions from './default-options';
import Slide from './slide';
import { EventTarget } from './utils';
import installModules from './modules';

const ensureSlideId = (slideElement, index) => {
    if (!slideElement.id) {
        slideElement.id = index + 1;
    }
};

class Shower extends EventTarget {
    constructor(options) {
        super();

        this._mode = 'list';
        this._isStarted = false;
        this.options = { ...defaultOptions, ...options };
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
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            throw new Error(`Shower container with selector '${containerSelector}' not found.`);
        }

        this._isStarted = true;
        this._initSlides();

        // maintains invariant: active slide always exists in `full` mode
        this.addEventListener('modechange', () => {
            if (this.isFullMode && !this.activeSlide) {
                this.first();
            }
        });

        installModules(this);
        this.dispatchEvent(new Event('start'));
    }

    _initSlides() {
        const slideElements = [
            ...this.container.querySelectorAll(this.options.slideSelector),
        ].filter((slideElement) => !slideElement.hidden);

        slideElements.forEach(ensureSlideId);
        this.slides = slideElements.map((slideElement) => {
            const slide = new Slide(slideElement, this.options);

            slide.addEventListener('activate', () => {
                this._changeActiveSlide(slide);
            });

            slide.element.addEventListener('click', () => {
                if (this.isListMode) {
                    this.enterFullMode();
                    slide.activate();
                }
            });

            return slide;
        });
    }

    _changeMode(mode) {
        if (mode === this._mode) return;

        this._mode = mode;
    }

    _changeActiveSlide(next) {
        const prev = this.slides.find((slide) => {
            return slide.isActive && slide !== next;
        });

        if (prev) {
            prev.deactivate();
        }

        const event = new CustomEvent('slidechange', {
            detail: { prev },
        });

        this.dispatchEvent(event);
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
    go(delta) {
        this.goTo(this.activeSlideIndex + delta);
    }

    /**
     * @param {boolean=} isForce
     */
    prev(isForce) {
        const prev = new Event('prev', { cancelable: !isForce });
        if (this.dispatchEvent(prev)) {
            this.go(-1);
        }
    }

    /**
     * @param {boolean=} isForce
     */
    next(isForce) {
        const next = new Event('next', { cancelable: !isForce });
        if (this.dispatchEvent(next)) {
            this.go(1);
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
