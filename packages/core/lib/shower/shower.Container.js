/**
 * @file Container class for shower slides.
 */
shower.modules.define('shower.Container', [
    'Emitter',
    'util.bound',
    'util.extend'
], function (provide, EventEmitter, bound, extend) {
    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @class
     * @name shower.Container
     *
     * Container class for shower slides. Contains DOM,
     * enter & exit slide mode.
     *
     * @param {Shower} shower Shower.
     * @param {HTMLElement} containerElement Container element.
     */
    function Container(shower, containerElement) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events
        });

        this._shower = shower;
        this._element = containerElement;
        this._isSlideMode = false;

        this.init();
    }

    extend(Container.prototype, /** @lends shower.Container.prototype */{

        init: function () {
            var bodyClassList = document.body.classList;
            var showerOptions = this._shower.options;

            var fullModeClass = showerOptions.get('mode_full_classname');
            var listModeClass = showerOptions.get('mode_list_classname');

            if (!bodyClassList.contains(listModeClass) &&
                !bodyClassList.contains(fullModeClass)) {
                bodyClassList.add(listModeClass);
            }

            this._setupListeners();
        },

        destroy: function () {
            this._clearListeners();
            this._element = null;
            this._shower = null;
            this._isSlideMode = null;
        },

        /**
         * @returns {HTMLElement} Container element.
         */
        getElement: function () {
            return this._element;
        },

        /**
         * Enter slide mode.
         * Slide fills the maximum area.
         *
         * @returns {shower.Container}
         */
        enterSlideMode: function () {
            var bodyClassList = document.body.classList;
            var showerOptions = this._shower.options;

            bodyClassList.remove(showerOptions.get('mode_list_classname'));
            bodyClassList.add(showerOptions.get('mode_full_classname'));

            document.body.setAttribute('role', 'application');

            this._applyTransform(this._getTransformScale());

            this._isSlideMode = true;
            this.events.emit('slidemodeenter');

            return this;
        },

        /**
         * Exit slide mode.
         * Shower returns into list mode.
         *
         * @returns {shower.Container}
         */
        exitSlideMode: function () {
            var elementClassList = document.body.classList;
            var showerOptions = this._shower.options;

            elementClassList.remove(showerOptions.get('mode_full_classname'));
            elementClassList.add(showerOptions.get('mode_list_classname'));

            document.body.removeAttribute('role', 'application');

            this._applyTransform('none');

            this._isSlideMode = false;
            this.scrollToCurrentSlide();
            this.events.emit('slidemodeexit');

            return this;
        },

        /**
         * Return state of slide mode.
         *
         * @returns {Boolean} Slide mode state.
         */
        isSlideMode: function () {
            return this._isSlideMode;
        },

        /**
         * Scroll to current slide.
         *
         * @returns {shower.Container}
         */
        scrollToCurrentSlide: function () {
            var activeSlideClassName = this._shower.options.get('slide_active_classname');
            var slideElement = this._element.querySelector('.' + activeSlideClassName);
            if (slideElement) {
                window.scrollTo(0, slideElement.offsetTop);
            }

            return this;
        },

        _setupListeners: function () {
            this._showerListeners = this._shower.events.group()
                .on('slideadd', this._onSlideAdd, this)
                .on('slideremove', this._onSlideRemove, this);

            window.addEventListener('resize', bound(this, '_onResize'));
            document.addEventListener('keydown', bound(this, '_onKeyDown'));
        },

        _clearListeners: function () {
            this._showerListeners.offAll();

            window.removeEventListener('resize', bound(this, '_onResize'));
            document.removeEventListener('keydown', bound(this, '_onKeyDown'));
        },

        _getTransformScale: function () {
            var denominator = Math.max(
                document.body.clientWidth / window.innerWidth,
                document.body.clientHeight / window.innerHeight
            );

            return 'scale(' + (1 / denominator) + ')';
        },

        _applyTransform: function (transformValue) {
            [
                'WebkitTransform',
                'MozTransform',
                'msTransform',
                'OTransform',
                'transform'
            ].forEach(function (property) {
                document.body.style[property] = transformValue;
            });
        },

        _onResize: function () {
            if (this.isSlideMode()) {
                this._applyTransform(this._getTransformScale());
            }
        },

        _onSlideAdd: function (e) {
            var slide = e.get('slide');
            slide.events
                .on('click', this._onSlideClick, this);
        },

        _onSlideRemove: function (e) {
            var slide = e.get('slide');
            slide.events
                .off('click', this._onSlideClick, this);
        },

        _onSlideClick: function () {
            if (!this._isSlideMode) {
                this.enterSlideMode();
            }
        },

        _onKeyDown: function (e) {
            if (!this._shower.isHotkeysEnabled()) {
                return;
            }

            var slideNumber;

            switch (e.which) {
                case 13: // Enter
                    e.preventDefault();
                    if (!this.isSlideMode() && e.metaKey) {
                        slideNumber = e.shiftKey ? 0 : this._shower.player.getCurrentSlideIndex();
                        this._shower.player.go(slideNumber);
                        this.enterSlideMode();
                    } else {
                        if (e.shiftKey) {
                            this._shower.player.prev();
                        } else {
                            this._shower.player.next();
                        }
                    }
                    break;

                case 27: // Esc
                    e.preventDefault();
                    this.exitSlideMode();
                    break;

                case 116: // F5 Shift
                    if (!this.isSlideMode() && e.shiftKey) {
                        e.preventDefault();
                        slideNumber = this._shower.player.getCurrentSlideIndex();
                        this._shower.player.go(slideNumber);
                        this.enterSlideMode();
                    }
                    break;

                case 80: // P Alt Cmd
                    if (!this.isSlideMode() && e.altKey && e.metaKey) {
                        e.preventDefault();
                        this.enterSlideMode();
                    }
                    break;
            }
        }
    });

    provide(Container);
});
