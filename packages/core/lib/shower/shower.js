import EventEmitter from '../emitter';
import defaultOptions from './default-options';
import Player from './player';
import Container from './container';
import Plugins from './plugins';
import defaultSlidesParser from './slides-parser';
import { Store } from '../utils';

/**
 * @class
 * @name Shower
 *
 * Core module of the Shower.
 *
 * @param {(HTMLElement|string)} [container='.shower'] Container element or his selector.
 * @param {object} [options] Shower options.
 * @param {boolean} [options.debug_mode = false] Debug mode.
 * @param {boolean} [options.hotkeys = true] If true — hotkeys will works.
 * @param {string} [options.slides_selector = '.shower .slide'] Slide selector.
 * @param {ISlidesParseFunction} [options.slides_parser] Parse function.
 * @param {object} [options.plugins] Plugins options.
 */
class Shower {
    constructor(container, options) {
        this.events = new EventEmitter({ context: this });
        this.options = new Store(defaultOptions, options);

        let containerElement = container || this.options.get('container_selector');
        if (typeof containerElement === 'string') {
            containerElement = document.querySelector(containerElement);
        }

        this.player = new Player(this);
        this.container = new Container(this, containerElement);

        this._slides = [];
        this._isHotkeysOn = true;
        this._liveRegion = null;

        this._initSlides();
        this._initLiveRegion();

        if (this.options.get('debug_mode')) {
            document.body.classList.add(this.options.get('debug_mode_classname'));
            console.info('Debug mode: on');
        }

        if (!this.options.get('hotkeys')) {
            this.disableHotkeys();
        }

        this.plugins = new Plugins(this);

        this._playerListeners = this.player.events.group()
            .on('activate', this._onPlayerSlideActivate, this);
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

        [slide] = this._slides.splice(index, 1);
        this.events.emit('slideremove', { slide });
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

    /**
     * Turn off hotkeys control.
     *
     * @returns {Shower}
     */
    disableHotkeys() {
        this._isHotkeysOn = false;
        return this;
    }

    /**
     * Turn on hotkeys control.
     *
     * @returns {Shower}
     */
    enableHotkeys() {
        this._isHotkeysOn = true;
        return this;
    }

    /**
     * @returns {boolean} Hotkeys is enabled.
     */
    isHotkeysEnabled() {
        return this._isHotkeysOn;
    }

    /**
     * @returns {HTMLElement} Live region element.
     */
    getLiveRegion() {
        return this._liveRegion;
    }

    /**
     * Update live region content.
     *
     * @param {string} content New content for live region.
     * @returns {Shower}
     */
    updateLiveRegion(content) {
        this._liveRegion.innerHTML = content;
        return this;
    }

    _onPlayerSlideActivate(event) {
        const currentSlide = event.get('slide');
        this.updateLiveRegion(currentSlide.getContent());
    }

    _initSlides() {
        const slidesParser = this.options.get('slides_parser') || defaultSlidesParser;
        const slides = slidesParser(
            this.container.getElement(),
            this.options.get('slides_selector')
        );

        this.add(slides);
    }

    _addSlide(slide) {
        slide.state.set('index', this._slides.length);
        this._slides.push(slide);
        this.events.emit('slideadd', { slide });
    }

    _initLiveRegion() {
        const region = document.createElement('section');
        region.className = 'region';
        region.setAttribute('role', 'region');
        region.setAttribute('aria-live', 'assertive');
        region.setAttribute('aria-relevant', 'additions');
        region.setAttribute('aria-label', 'Slide Content: Auto-updating');

        this._liveRegion = region;
        document.body.appendChild(region);
    }
}

export default Shower;
