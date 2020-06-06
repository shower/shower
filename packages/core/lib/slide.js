import { EventTarget, defineReadOnly } from './utils';

/**
 * @param {Shower} shower
 * @param {HTMLElement} element
 */
class Slide extends EventTarget {
    constructor(shower, element) {
        super();

        defineReadOnly(this, {
            shower,
            element,
            state: {
                visitCount: 0,
                innerStepCount: 0,
            },
        });

        this._isActive = false;
        this._options = shower.options;

        this.element.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            this.activate();
            shower.enterFullMode();
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
        const titleElement = this.element.querySelector(this._options.slideTitleSelector);
        return titleElement ? titleElement.innerText : '';
    }

    activate() {
        if (this._isActive) return;

        this.state.visitCount++;
        this.element.classList.add(this._options.activeSlideClass);

        this._isActive = true;
        this.shower.setActiveSlide(this);
        this.dispatchEvent(new Event('activate'));
    }

    deactivate() {
        if (!this._isActive) return;

        this.element.classList.replace(
            this._options.activeSlideClass,
            this._options.visitedSlideClass,
        );

        this._isActive = false;
        this.dispatchEvent(new Event('deactivate'));
    }
}

export default Slide;
