import { isInteractiveElement } from '../utils';

/**
 * @class
 * Touch events plugin for shower.
 * @name Touch
 * @param {Shower} shower
 */
class Touch {
    constructor(shower) {
        this._shower = shower;
        this._setupListeners();
    }

    _setupListeners() {
        this._showerListeners = this._shower.events.group()
            .on('add', this._onSlideAdd.bind(this))
            .on('destroy', this._destroy.bind(this));

        this._bindedTouchStart = this._onTouchStart.bind(this);
        this._bindedTouchMove = this._onTouchMove.bind(this);

        this._shower.getSlides().forEach(this._addTouchStartListener, this);
        document.addEventListener('touchmove', this._bindedTouchMove, true);
    }

    _onSlideAdd(event) {
        const slide = event.get('slide');
        this._addTouchStartListener(slide);
    }

    _addTouchStartListener(slide) {
        const element = slide.layout.getElement();
        element.addEventListener('touchstart', this._bindedTouchStart);
    }

    _onTouchStart(event) {
        const slide = this._getSlideByElement(event.currentTarget);
        if (!slide) return;

        if (this._shower.container.isSlideMode()) {
            if (isInteractiveElement(event.target)) return;

            event.preventDefault();
            const [{ pageX }] = event.touches;

            if (pageX > innerWidth / 2) {
                this._shower.player.next();
            } else {
                this._shower.player.prev();
            }
        } else {
            // Go and turn on slide mode.
            slide.activate();
        }
    }

    _onTouchMove(event) {
        if (this._shower.container.isSlideMode()) {
            event.preventDefault();
        }
    }

    _getSlideByElement({ id }) {
        const slides = this._shower.getSlides();

        return slides.find(slide => slide.getId() === id);
    }

    _destroy() {
        this._shower = null;
        this._clearListeners();
    }

    _clearListeners() {
        this._showerListeners.offAll();
        this._shower.getSlides().forEach(this._removeTouchStartListener, this);
        document.removeEventListener('touchmove', this._bindedTouchMove);
    }

    _removeTouchStartListener(slide) {
        const element = slide.layout.getElement();
        element.removeEventListener('touchstart', this._bindedTouchStart);
    }
}

export default Touch;
