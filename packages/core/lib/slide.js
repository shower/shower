import { EventTarget } from './utils';

/**
 * @param {HTMLElement} element
 * @param {object} options
 */
class Slide extends EventTarget {
    constructor(element, options) {
        super();

        this.element = element;
        this.options = options;

        this.element.addEventListener('click', () => {
            this.activate();
            this.dispatchEvent(new Event('fullmoderequest'));
        });

        this._isActive = false;
        this.state = {
            visitsCount: 0,
            innerStepsCount: 0,
        };
    }

    get isActive() {
        return this._isActive;
    }

    get isVisited() {
        return this.state.visitsCount > 0;
    }

    get id() {
        return this.element.id;
    }

    get title() {
        const titleElement = this.element.querySelector(this.options.slideTitleSelector);
        return titleElement ? titleElement.innerText : '';
    }

    activate() {
        if (this._isActive) return;

        this._isActive = true;
        this.state.visitsCount++;
        this.element.classList.add(this.options.activeSlideClass);
        this.dispatchEvent(new Event('activate'));
    }

    deactivate() {
        if (!this._isActive) return;

        this._isActive = false;
        this.element.classList.replace(
            this.options.activeSlideClass,
            this.options.visitedSlideClass,
        );
        this.dispatchEvent(new Event('deactivate'));
    }
}

export default Slide;
