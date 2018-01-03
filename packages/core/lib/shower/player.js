import EventEmitter from '../emitter';

/**
 * @class
 * @name Player
 *
 * Control slides.
 *
 * @param {Shower} shower Shower.
 */
class Player {
    constructor(shower) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events,
        });

        this._shower = shower;
        this._currentSlideIndex = -1;
        this._setupListeners();
    }

    _setupListeners() {
        this._shower.events.group()
            .on('slideadd', this._onSlideAdd.bind(this))
            .on('slideremove', this._onSlideRemove.bind(this));

        this.events.group()
            .on('prev', this._onPrev, this, 100)
            .on('next', this._onNext, this, 100);
    }

    _onPrev() {
        this.go(this._currentSlideIndex - 1);
    }

    _onNext() {
        this.go(this._currentSlideIndex + 1);
    }

    prev() {
        this.events.emit('prev');
        return this;
    }

    next() {
        this.events.emit('next');
        return this;
    }

    first() {
        this.go(0);
        return this;
    }

    last() {
        this.go(this._shower.getSlidesCount() - 1);
        return this;
    }

    /**
     * Go to custom slide by index.
     *
     * @param {number | Slide} index Slide index to activate.
     * @returns {Player}
     */
    go(index) {
        // If go by slide instance.
        if (typeof index !== 'number') {
            index = this._shower.getSlideIndex(index);
        }

        const slidesCount = this._shower.getSlidesCount();
        let slide = this._currentSlide;

        if (index !== this._currentSlideIndex && index < slidesCount && index >= 0) {
            if (slide && slide.isActive()) {
                slide.deactivate();
            }

            slide = this._shower.get(index);
            if (!slide.isActive()) {
                slide.activate();
            }

            this._currentSlide = slide;
            this._currentSlideIndex = index;
            this.events.emit('activate', { index, slide });
        }

        return this;
    }

    /**
     * @returns {Slide} Current active slide.
     */
    getCurrentSlide() {
        return this._currentSlide;
    }

    /**
     * @returns {Number} Current active slide index.
     */
    getCurrentSlideIndex() {
        return this._currentSlideIndex;
    }

    _onSlideAdd(event) {
        const slide = event.get('slide');
        slide.events.on('activate', this._onSlideActivate, this);
    }

    _onSlideRemove(event) {
        const slide = event.get('slide');
        slide.events.off('activate', this._onSlideActivate, this);
    }

    _onSlideActivate(event) {
        const slide = event.get('slide');
        const index = this._shower.getSlideIndex(slide);

        this.go(index);
    }
}

export default Player;
