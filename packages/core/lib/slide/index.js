import EventEmitter from '../emitter';
import { Store } from '../utils';
import Layout from './layout';

/**
 * @class
 * @name Slide
 *
 * Slide class.
 *
 * @param {(string|HTMLElement)} content
 * @param {object} [options]
 * @param {string} [options.title_element_selector = 'h2']
 * @param {string} [options.active_classname = 'active']
 * @param {string} [options.visited_classname = 'visited']
 * @param {object} [state] Current slide state.
 * @param {number} [state.visited=0] Count of visit slide.
 */
class Slide {
    constructor(content, options, state) {
        this.events = new EventEmitter();
        this.options = new Store(options);
        this.layout = null;

        this.state = new Store({
            visited: 0,
            index: null,
        }, state);

        this._content = content;
        this._isVisited = this.state.get('visited') > 0;
        this._isActive = false;

        this.init();
    }

    init() {
        this.layout = typeof this._content === 'string' ?
            Layout.create({ content: this._content }) :
            new Layout(this._content, this.options);

        this.layout.setParent(this);
        this._setupListeners();
    }

    destroy() {
        this._clearListeners();
        this._isActive = null;

        this.options = null;
        this.layout.destroy();
    }

    /**
     * Activate slide.
     *
     * @returns {Slide}
     */
    activate() {
        this._isActive = true;

        const visited = this.state.get('visited');
        this.state.set('visited', visited + 1);
        this.events.emit('activate', { slide: this });

        return this;
    }

    /**
     * Deactivate slide.
     *
     * @returns {Slide}
     */
    deactivate() {
        this._isActive = false;
        this.events.emit('deactivate', { slide: this });

        return this;
    }

    /**
     * Get active state.
     *
     * @returns {boolean}
     */
    isActive() {
        return this._isActive;
    }

    /**
     * Get visited state.
     *
     * @returns {boolean}
     */
    isVisited() {
        return this.state.get('visited') > 0;
    }

    /**
     * Get slide title.
     *
     * @borrows slide.Layout.getTitle
     */
    getTitle() {
        return this.layout.getTitle();
    }

    /**
     * Set slide title.
     *
     * @borrows slide.Layout.getTitle
     * @returns {Slide}
     */
    setTitle(title) {
        this.layout.setTitle(title);
        return this;
    }

    /**
     * Get id of slide element.
     *
     * @returns {(string|undefined)}
     */
    getId() {
        return this.layout.getElement().id;
    }

    /**
     * Get slide content.
     *
     * @borrows Layout.getContent
     */
    getContent() {
        return this.layout.getContent();
    }

    _setupListeners() {
        this.layoutListeners = this.layout.events.group()
            .on('click', this._onSlideClick, this);
    }

    _clearListeners() {
        this.layoutListeners.offAll();
    }

    _onSlideClick() {
        this.activate();
        this.events.emit('click', { slide: this });
    }
}

export default Slide;
