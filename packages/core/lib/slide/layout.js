import EventEmitter from '../emitter';
import { defaultOptions } from '../shower';

/**
 * @class Slide layout. Work with DOM, DOM events, etc. View for Slide class.
 * @name Layout
 * @param {HTMLElement} element Slide node.
 * @param {object} options Options for slide layout.
 */
class Layout {
    /**
     * @static
     * @function
     *
     * Layout factory for slides.
     *
     * @param {object} [options]
     * @param {string} [options.content=''] Slide content.
     * @param {string} [options.contentType='slide'] Cover, slide, image.
     * @returns {Layout}
     */
    static create(options = {}) {
        const {
            content = '',
            contentType = 'slide',
        } = options;

        const element = document.createElement('section');
        element.innerHTML = content;
        element.classList.add(contentType);

        return new this(element);
    }

    constructor(element, options) {
        this.events = new EventEmitter();
        this.options = Object.assign({
            title_element_selector: defaultOptions.slide_title_element_selector,
            active_classname: defaultOptions.slide_active_classname,
            visited_classname: defaultOptions.slide_visited_classname,
        }, options);

        this._element = element;
        this._parent = null;
        this._parentElement = null;
        this._init();
    }

    _init() {
        const { parentNode } = this._element;
        if (parentNode) {
            this._parentElement = parentNode;
        } else {
            this.setParentElement(parentNode);
        }
    }

    setParent(parent) {
        if (this._parent === parent) return;

        this._clearListeners();
        this._parent = parent;

        if (this._parent) {
            this._setupListeners();
        }
    }

    getParent() {
        return this._parent;
    }

    /**
     * @param {HTMLElement} parentElement
     */
    setParentElement(parentElement) {
        if (this._parentElement === parentElement) return;

        this._parentElement = parentElement;
        parentElement.appendChild(this._element);
    }

    /**
     * Return slide parent HTML element.
     *
     * @returns {HTMLElement} Layout parent element.
     */
    getParentElement() {
        return this._parentElement;
    }

    /**
     * Return slide HTML element.
     *
     * @returns {HTMLElement} Layout element.
     */
    getElement() {
        return this._element;
    }

    /**
     * Set slide title or create new H2 element into slide element.
     *
     * @param {string} title Slide title.
     */
    setTitle(title) {
        const titleSelector = this.options.title_element_selector;
        let titleElement = this._element.querySelector(titleSelector);

        if (!titleElement) {
            titleElement = document.createElement(titleSelector);
            this._element.insertBefore(titleElement, this._element.firstChild);
        }

        titleElement.innerHTML = title;
    }

    /**
     * Return text content of H2 element.
     *
     * @returns {(string|null)} Title.
     */
    getTitle() {
        const titleSelector = this.options.title_element_selector;
        const titleElement = this._element.querySelector(titleSelector);

        return titleElement && titleElement.textContent;
    }

    /**
     * Get inner content from slide element.
     *
     * @returns {string} Slide content.
     */
    getContent() {
        return this._element.innerHTML;
    }

    _setupListeners() {
        this._slideListeners = this._parent.events.group()
            .on('activate', this._onSlideActivate, this)
            .on('deactivate', this._onSlideDeactivate, this);

        this._onSlideClick = this._onSlideClick.bind(this);
        this._element.addEventListener('click', this._onSlideClick);
    }

    _clearListeners() {
        if (this._slideListeners) {
            this._slideListeners.offAll();
        }

        this._element.removeEventListener('click', this._onSlideClick);
    }

    _onSlideActivate() {
        this._element.classList.add(this.options.active_classname);
    }

    _onSlideDeactivate() {
        const list = this._element.classList;
        list.remove(this.options.active_classname);
        list.add(this.options.visited_classname);
    }

    _onSlideClick() {
        this.events.emit('click');
    }
}

export default Layout;
