/**
 * @file Slides player.
 */
shower.modules.define('shower.Player', [
    'Emitter',
    'util.extend'
], function (provide, EventEmitter, extend) {

    /**
     * @class
     * @name shower.Player
     *
     * Control slides.
     *
     * @param {Shower} shower Shower.
     */
    function Player(shower) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events
        });

        this._shower = shower;
        this._showerListeners = null;
        this._playerListeners = null;

        this._currentSlideNumber = -1;
        this._currentSlide = null;

        this.init();
    }

    extend(Player.prototype, /** @lends shower.Player.prototype */ {

        init: function () {
            this._showerListeners = this._shower.events.group()
                .on('slideadd', this._onSlideAdd, this)
                .on('slideremove', this._onSlideRemove, this)
                .on('slidemodeenter', this._onContainerSlideModeEnter, this);

            this._playerListeners = this.events.group()
                .on('prev', this._onPrev, this)
                .on('next', this._onNext, this);

            document.addEventListener('keydown', this._onKeyDown.bind(this));
        },

        destroy: function () {
            this._showerListeners.offAll();
            this._playerListeners.offAll();

            document.removeEventListener('keydown', this._onKeyDown.bind(this));

            this._currentSlide = null;
            this._currentSlideNumber = null;
            this._shower = null;
        },

        /**
         * Go to next slide.
         *
         * @returns {shower.Player}
         */
        next: function () {
            this.events.emit('next');
            return this;
        },

        /**
         * Go to previous slide.
         *
         * @returns {shower.Player}
         */
        prev: function () {
            this.events.emit('prev');
            return this;
        },

        /**
         * Go to first slide.
         *
         * @returns {shower.Player}
         */
        first: function () {
            this.go(0);
            return this;
        },

        /**
         * Go to last slide.
         *
         * @returns {shower.Player}
         */
        last: function () {
            this.go(this._shower.getSlidesCount() - 1);
            return this;
        },

        /**
         * Go to custom slide by index.
         *
         * @param {number | Slide} index Slide index to activate.
         * @returns {shower.Player}
         */
        go: function (index) {
            // If go by slide istance.
            if (typeof index !== 'number') {
                index = this._shower.getSlidesArray().indexOf(index);
            }

            var slidesCount = this._shower.getSlidesCount();
            var currentSlide = this._currentSlide;

            if (index != this._currentSlideNumber && index < slidesCount && index >= 0) {
                if (currentSlide && currentSlide.isActive()) {
                    currentSlide.deactivate();
                }

                currentSlide = this._shower.get(index);

                this._currentSlide = currentSlide;
                this._currentSlideNumber = index;

                if (!currentSlide.isActive()) {
                    currentSlide.activate();
                }

                this.events.emit('activate', {
                    index: index,
                    slide: currentSlide
                });
            }

            return this;
        },

        /**
         * @returns {Slide} Current active slide.
         */
        getCurrentSlide: function () {
            return this._currentSlide;
        },

        /**
         * @returns {Number} Current active slide index.
         */
        getCurrentSlideIndex: function () {
            return this._currentSlideNumber;
        },

        _onPrev: function () {
            this._changeSlide(this._currentSlideNumber - 1);
        },

        _onNext: function () {
            this._changeSlide(this._currentSlideNumber + 1);
        },

        /**
         * @ignore
         * @param {number} index Slide index.
         */
        _changeSlide: function (index) {
            this.go(index);
        },

        _onSlideAdd: function (e) {
            var slide = e.get('slide');

            slide.events
                .on('activate', this._onSlideActivate, this);
        },

        _onSlideRemove: function (e) {
            var slide = e.get('slide');

            slide.events
                .off('activate', this._onSlideActivate, this);
        },

        _onSlideActivate: function (e) {
            var slide = e.get('slide');
            var slideNumber = this._shower.getSlidesArray().indexOf(slide);

            this.go(slideNumber);
        },

        _onKeyDown: function (e) {
            if (!this._shower.isHotkeysEnabled()) {
                return;
            }

            this.events.emit('keydown', {
                event: e
            });

            switch (e.which) {
                case 33: // PgUp
                case 38: // Up
                case 37: // Left
                case 72: // H
                case 75: // K
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();
                    this.prev();
                    break;

                case 34: // PgDown
                case 40: // Down
                case 39: // Right
                case 76: // L
                case 74: // J
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();
                    this.next();
                    break;

                case 36: // Home
                    e.preventDefault();
                    this.first();
                    break;

                case 35: // End
                    e.preventDefault();
                    this.last();
                    break;

                case 9: // Tab (Shift)
                case 32: // Space (Shift)
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();

                    if (e.shiftKey) {
                        this.prev();
                    } else {
                        this.next();
                    }
                    break;
            }
        },

        _onContainerSlideModeEnter: function () {
            if (!this._currentSlide) {
                this.go(0);
            }
        }
    });

    provide(Player);
});
