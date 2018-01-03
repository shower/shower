import EventEmitter from '../emitter';

const getTransformScale = () => {
    const factor = 1 / Math.max(
        document.body.clientWidth / innerWidth,
        document.body.clientHeight / innerHeight
    );

    return `scale(${factor})`;
};

const applyTransform = value => {
    document.body.style.transform = value;
};

/**
 * @class
 * @name Container
 *
 * Container class for shower slides. Contains DOM,
 * enter & exit slide mode.
 *
 * @param {Shower} shower Shower.
 * @param {HTMLElement} containerElement Container element.
 */
class Container {
    constructor(shower, containerElement) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events,
        });

        this._shower = shower;
        this._element = containerElement;
        this._isSlideMode = false;

        this._key = `${shower.options.sessionstore_key}-mode`;
        this._init();
        this._setupListeners();
    }

    _init() {
        const { options } = this._shower;
        const fullMode = options.mode_full_classname;
        const listMode = options.mode_list_classname;

        const list = document.body.classList;
        if (list.contains(fullMode) || sessionStorage[this._key] === 'full') {
            this.enterSlideMode();
        } else {
            list.add(listMode);
        }
    }

    _setupListeners() {
        this._showerListeners = this._shower.events.group()
            .on('slideadd', this._onSlideAdd, this)
            .on('slideremove', this._onSlideRemove, this);

        window.addEventListener('resize', () => {
            if (this.isSlideMode()) {
                applyTransform(getTransformScale());
            }
        });
    }

    /**
     * @returns {HTMLElement} Container element.
     */
    getElement() {
        return this._element;
    }

    /**
     * Enter slide mode.
     * Slide fills the maximum area.
     *
     * @returns {Container}
     */
    enterSlideMode() {
        if (this._isSlideMode) return this;

        const list = document.body.classList;
        const { options } = this._shower;

        list.remove(options.mode_list_classname);
        list.add(options.mode_full_classname);
        sessionStorage[this._key] = 'full';

        applyTransform(getTransformScale());
        this._isSlideMode = true;
        this.events.emit('modechange');

        return this;
    }

    /**
     * Exit slide mode.
     * Shower returns into list mode.
     *
     * @returns {Container}
     */
    exitSlideMode() {
        if (!this._isSlideMode) return this;

        const list = document.body.classList;
        const { options } = this._shower;

        list.remove(options.mode_full_classname);
        list.add(options.mode_list_classname);
        sessionStorage[this._key] = 'list';

        applyTransform('none');
        this.scrollToCurrentSlide();
        this._isSlideMode = false;
        this.events.emit('modechange');

        return this;
    }

    /**
     * Return state of slide mode.
     *
     * @returns {Boolean} Slide mode state.
     */
    isSlideMode() {
        return this._isSlideMode;
    }

    /**
     * Scroll to current slide.
     *
     * @returns {Container}
     */
    scrollToCurrentSlide() {
        const activeSlideClass = this._shower.options.slide_active_classname;
        const slideElement = this._element.querySelector(`.${activeSlideClass}`);
        if (slideElement) {
            slideElement.scrollIntoView();
        }

        return this;
    }

    _onSlideAdd(event) {
        const slide = event.get('slide');
        slide.events.on('click', this.enterSlideMode, this);
    }

    _onSlideRemove(event) {
        const slide = event.get('slide');
        slide.events.off('click', this.enterSlideMode, this);
    }
}

export default Container;
