/**
 * @file Slides player.
 */
shower.modules.define('shower.Player', [
    'Emitter',
    'util.bound',
    'util.extend'
], function (provide, EventEmitter, bound, extend) {

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
                .on('slidemodeenter', this._onSlideModeEnter, this);

            this._playerListeners = this.events.group()
                .on('prev', this._onPrev, this)
                .on('next', this._onNext, this)
                .on('prevslide', this._onPrev, this)
                .on('nextslide', this._onNext, this);

            document.addEventListener('keydown', bound(this, '_onKeyDown'));
        },

        destroy: function () {
            this._showerListeners.offAll();
            this._playerListeners.offAll();

            document.removeEventListener('keydown', bound(this, '_onKeyDown'));

            this._currentSlide = null;
            this._currentSlideNumber = null;
            this._shower = null;
        },

        /**
         * Go to next step.
         *
         * @returns {shower.Player}
         */
        next: function () {
            this.events.emit('next');
            return this;
        },

        /**
         * Go to previous step.
         *
         * @returns {shower.Player}
         */
        prev: function () {
            this.events.emit('prev');
            return this;
        },

        /**
         * Go to next slide.
         *
         * @returns {shower.Player}
         */
        nextSlide: function () {
            this.events.emit('nextslide');
            return this;
        },

        /**
         * Go to previous slide.
         *
         * @returns {shower.Player}
         */
        prevSlide: function () {
            this.events.emit('prevslide');
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
                index = this._shower.getSlideIndex(index);
            }

            var slidesCount = this._shower.getSlidesCount();
            var currentSlide = this._currentSlide;

            if (index !== this._currentSlideNumber && index < slidesCount && index >= 0) {
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
            var slideNumber = this._shower.getSlideIndex(slide);

            this.go(slideNumber);
        },

        _onKeyDown: function (e) {
            if (!this._shower.isHotkeysEnabled() ||
                /^(?:button|input|select|textarea)$/i.test(e.target.tagName)) {
                return;
            }

            this.events.emit('keydown', {
                event: e
            });

            var action;
            var allowModifiers = false;

            switch (e.which) {
                case 33: // PgUp (Shift)
                case 38: // Up   (Shift)
                case 37: // Left (Shift)
                case 72: // H (Shift)
                case 75: // K (Shift)
                case 80: // P (Shift)
                    action = e.shiftKey ? 'prevSlide' : 'prev';
                    break;

                case 34: // PgDown (Shift)
                case 40: // Down   (Shift)
                case 39: // Right  (Shift)
                case 76: // L (Shift)
                case 74: // J (Shift)
                case 78: // N (Shift)
                    action = e.shiftKey ? 'nextSlide' : 'next';
                    break;

                case 36: // Home
                    allowModifiers = true;
                    action = 'first';
                    break;

                case 35: // End
                    allowModifiers = true;
                    action = 'last';
                    break;

                case 32: // Space (Shift)
                    if (this._shower.container.isSlideMode()) {
                        action = e.shiftKey ? 'prev' : 'next';
                    }
                    break;
            }

            if (action && (allowModifiers || !e.altKey && !e.ctrlKey && !e.metaKey)) {
                e.preventDefault();
                this[action]();
            }
        },

        _onSlideModeEnter: function () {
            if (!this._currentSlide) {
                this.go(0);
            }
        }
    });

    provide(Player);
});
