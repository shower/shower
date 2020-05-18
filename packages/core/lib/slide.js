import { EventTarget, defineReadOnly } from './utils';

/**
 * @param {HTMLElement} element
 * @param {object} options
 */
class Slide extends EventTarget {
    constructor(element, options) {
        super();

        defineReadOnly(this, {
            element,
            options,
            state: {
                visitCount: 0,
                innerStepCount: 0,
            },
        });

        this._isActive = false;
        this.element.addEventListener('click', () => {
            this.activate();
            this.dispatchEvent(new Event('fullmoderequest'));
        });
    }

    get isActive() {
        return this._isActive;
    }

    get isVisited() {
        return this.state.visitCount > 0;
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

        this.state.visitCount++;
        this.element.classList.add(this.options.activeSlideClass);

        this._isActive = true;
        this.dispatchEvent(new Event('activate'));
    }

    deactivate() {
        if (!this._isActive) return;

        this.element.classList.replace(
            this.options.activeSlideClass,
            this.options.visitedSlideClass,
        );

        this._isActive = false;
        this.dispatchEvent(new Event('deactivate'));
    }
}

export default Slide;
