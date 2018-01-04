import EventEmitter from '../emitter';
import defaultOptions from './default-options';
import Player from './player';
import Container from './container';
import Plugins from './plugins';
import parseSlides from './parse-slides';

/**
 * @class
 * @name Shower
 *
 * Core module of the Shower.
 *
 * @param {(HTMLElement|string)} [container='.shower'] Container element or his selector.
 * @param {object} [options] Shower options.
 * @param {boolean} [options.debug_mode = false] Debug mode.
 * @param {string} [options.slides_selector = '.shower .slide'] Slide selector.
 * @param {object} [options.plugins] Plugins options.
 */
class Shower {
    constructor(container, options) {
        this.events = new EventEmitter({ context: this });
        this.options = Object.assign({}, defaultOptions, options);

        let containerElement = container || this.options.container_selector;
        if (typeof containerElement === 'string') {
            containerElement = document.querySelector(containerElement);
        }

        this.player = new Player(this);
        this.container = new Container(this, containerElement);

        this._slides = [];
        this._initSlides();

        if (this.options.debug_mode) {
            document.body.classList.add(this.options.debug_mode_classname);
            console.info('Debug mode: on');
        }

        this.plugins = new Plugins(this);
    }

    /**
     * Destroy Shower.
     */
    destroy() {
        this.events.emit('destroy');

        this.container.destroy();
        this.player.destroy();

        this._slides = [];
    }

    /**
     * Add slide or array of slides.
     *
     * @param {(Slide|Slide[])} slides Slide or array or slides.
     * @returns {Shower}
     */
    add(slides) {
        [].concat(slides).forEach(slide => {
            this._addSlide(slide);
        });

        return this;
    }

    /**
     * Remove slide from shower.
     *
     * @param {(Slide|number)} slide Slide {@link Slide} or slide index.
     * @returns {Shower} Self link.
     */
    remove(slide) {
        const index = typeof slide === 'number' ?
            slide :
            this._slides.indexOf(slide);

        if (!(index in this._slides)) {
            throw new Error('Slide not found');
        }

        const [removed] = this._slides.splice(index, 1);
        this.events.emit('slideremove', { slide: removed });
        return this;
    }

    /**
     * Return slide by index.
     *
     * @param {number} index Slide index.
     * @returns {Slide} Slide by index.
     */
    get(index) {
        return this._slides[index];
    }

    /**
     * @returns {Slide[]} Array with slides {@link Slide}.
     */
    getSlides() {
        return this._slides.slice();
    }

    /**
     * @returns {number} Slides count.
     */
    getSlidesCount() {
        return this._slides.length;
    }

    /**
     * @param {Slide} slide
     * @returns {number} Slide index or -1 of slide not found.
     */
    getSlideIndex(slide) {
        return this._slides.indexOf(slide);
    }

    _initSlides() {
        const slides = parseSlides(
            this.container.getElement(),
            this.options.slides_selector
        );

        this.add(slides);
    }

    _addSlide(slide) {
        this._slides.push(slide);
        this.events.emit('slideadd', { slide });
    }
}

export default Shower;
