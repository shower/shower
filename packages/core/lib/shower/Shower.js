/**
 * @file Core module of the Shower.
 */
shower.modules.define('Shower', [
    'Emitter',
    'Options',
    'shower.global',
    'shower.defaultOptions',
    'shower.Container',
    'shower.Player',
    'shower.Location',
    'shower.slidesParser',
    'util.extend'
], function (provide, EventEmitter, Options, showerGlobal, defaultShowerOptions,
    Container, Player, Location, defaultSlidesParser, extend) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @typedef {function} ISlidesParseFunction
     * @param {HTMLElement} containerElement
     * @param {string} cssSelector Slides selector.
     * @returns {Slide[]} Slides.
     */

    /**
     * @class
     * @name Shower
     *
     * @param {(HTMLElement|string)} [container='.shower'] Container element or his selector.
     * @param {object} [options] Shower options.
     * @param {boolean} [options.debug_mode = false] Debug mode.
     * @param {boolean} [options.hotkeys = true] If true — hotkeys will works.
     * @param {string} [options.slides_selector = '.shower .slide'] Slide selector.
     * @param {ISlidesParseFunction} [options.slides_parser] Parse function.
     * @param {object} [options.plugins] Plugins options.
     * @returns {Shower}
     */
    function Shower(container, options) {
        options = options || {};

        this.events = new EventEmitter({context: this});
        this.options = new Options({}, defaultShowerOptions, options);

        var containerElement = container || this.options.get('container_selector');
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
            console.info('Debug mode on');
        }

        if (!this.options.get('hotkeys')) {
            this.disableHotkeys();
        }

        this.location = new Location(this);

        // Notify abount new shower instance.
        showerGlobal.events.emit('notify', {shower: this});

        this._playerListeners = this.player.events.group()
            .on('activate', this._onPlayerSlideActivate, this);
    }

    extend(Shower.prototype, /** @lends Shower.prototype */{
        /**
         * Destroy Shower.
         */
        destroy: function () {
            this.events.emit('destroy');

            this.location.destroy();
            this.container.destroy();
            this.player.destroy();

            this._slides = [];
        },

        /**
         * Add slide or array of slides.
         *
         * @param {(Slide|Slide[])} slide Slide or array or slides.
         * @returns {Shower}
         */
        add: function (slide) {
            if (Array.isArray.call(null, slide)) {
                for (var i = 0, k = slide.length; i < k; i++) {
                    this._addSlide(slide[i]);
                }
            } else {
                this._addSlide(slide);
            }

            return this;
        },

        /**
         * Remove slide from shower.
         *
         * @param {(Slide|number)} slide Slide {@link Slide} or slide index.
         * @returns {Shower} Self link.
         */
        remove: function (slide) {
            var slidePosition;

            if (typeof slide === 'number') {
                slidePosition = slide;
            } else if (this._slides.indexOf(slide) !== -1) {
                slidePosition = this._slides.indexOf(slide);
            } else {
                throw new Error('Slide not found');
            }

            slide = this._slides.splice(slidePosition, 1)[0];

            this.events.emit('slideremove', {
                slide: slide
            });

            slide.destroy();
            return this;
        },

        /**
         * Return slide by index.
         *
         * @param {number} index Slide index.
         * @returns {Slide} Slide by index.
         */
        get: function (index) {
            return this._slides[index];
        },

        /**
         * @returns {Slide[]} Array with slides {@link Slide}.
         */
        getSlides: function () {
            return this._slides.slice();
        },

        /**
         * @returns {number} Slides count.
         */
        getSlidesCount: function () {
            return this._slides.length;
        },

        /**
         * @param {Slide} slide
         * @returns {number} Slide index or -1 of slide not found.
         */
        getSlideIndex: function (slide) {
            return this._slides.indexOf(slide);
        },

        /**
         * Turn off hotkeys control.
         *
         * @returns {Shower}
         */
        disableHotkeys: function () {
            this._isHotkeysOn = false;
            return this;
        },

        /**
         * Turn on hotkeys control.
         *
         * @returns {Shower}
         */
        enableHotkeys: function () {
            this._isHotkeysOn = true;
            return this;
        },

        /**
         * @returns {boolean} Hotkeys is enabled.
         */
        isHotkeysEnabled: function () {
            return this._isHotkeysOn;
        },

        /**
         * @returns {HTMLElement} Live region element.
         */
        getLiveRegion: function () {
            return this._liveRegion;
        },

        /**
         * Update live region content.
         *
         * @param {string} content New content for live region.
         * @returns {Shower}
         */
        updateLiveRegion: function (content) {
            this._liveRegion.innerHTML = content;
            return this;
        },

        _onPlayerSlideActivate: function (event) {
            var currentSlide = event.get('slide');
            this.updateLiveRegion(currentSlide.getContent());
        },

        _initSlides: function () {
            var slidesParser = this.options.get('slides_parser') || defaultSlidesParser;
            var slides = slidesParser(this.container.getElement(), this.options.get('slides_selector'));
            this.add(slides);
        },

        _addSlide: function (slide) {
            slide.state.set('index', this._slides.length);
            this._slides.push(slide);

            this.events.emit('slideadd', {
                slide: slide
            });
        },

        _initLiveRegion: function () {
            var liveRegion = document.createElement('section');
            liveRegion.setAttribute('role', 'region');
            liveRegion.setAttribute('aria-live', 'assertive');
            liveRegion.setAttribute('aria-relevant', 'additions');
            liveRegion.setAttribute('aria-label', 'Slide Content: Auto-updating');
            liveRegion.className = 'region';

            document.body.appendChild(liveRegion);
            this._liveRegion = liveRegion;
        }
    });

    provide(Shower);
});
