/**
 * Core for Shower HTML presentation engine
 * @shower/core v3.0.0-2, https://github.com/shower/core
 * @copyright 2010–2020 Vadim Makeev, https://pepelsbey.net
 * @license MIT
 */
(function () {
    'use strict';

    const EVENT_TARGET = Symbol('EventTarget');

    class EventTarget {
        constructor() {
            this[EVENT_TARGET] = document.createElement('div');
        }

        addEventListener(...args) {
            this[EVENT_TARGET].addEventListener(...args);
        }

        removeEventListener(...args) {
            this[EVENT_TARGET].removeEventListener(...args);
        }

        dispatchEvent(event) {
            Object.defineProperties(event, {
                target: { value: this },
                currentTarget: { value: this },
            });

            return this[EVENT_TARGET].dispatchEvent(event);
        }
    }

    const isInteractiveElement = (element) => element.tabIndex !== -1;
    const freezeHistory = (callback) => {
        history.pushState = () => {};
        history.replaceState = () => {};

        try {
            callback();
        } finally {
            delete history.pushState;
            delete history.replaceState;
        }
    };

    const contentLoaded = (callback) => {
        if (document.currentScript.async) {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    var defaultOptions = {
        containerSelector: '.shower',
        progressSelector: '.progress',
        stepSelector: '.next',
        fullModeClass: 'full',
        listModeClass: 'list',

        slideSelector: '.slide',
        slideTitleSelector: 'h2',
        activeSlideClass: 'active',
        visitedSlideClass: 'visited',
    };

    /**
     * @param {HTMLElement} element
     * @param {object} options
     */
    class Slide extends EventTarget {
        constructor(element, options) {
            super();

            this.element = element;
            this.options = options;

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

    const createLiveRegion = () => {
        const liveRegion = document.createElement('section');
        liveRegion.className = 'region';
        liveRegion.setAttribute('role', 'region');
        liveRegion.setAttribute('aria-live', 'assertive');
        liveRegion.setAttribute('aria-relevant', 'all');
        liveRegion.setAttribute('aria-label', 'Slide Content: Auto-updating');
        return liveRegion;
    };

    var a11y = (shower) => {
        const { container } = shower;
        const liveRegion = createLiveRegion();
        container.appendChild(liveRegion);

        const updateDocumentRole = () => {
            if (shower.isFullMode) {
                container.setAttribute('role', 'application');
            } else {
                container.removeAttribute('role');
            }
        };

        const updateLiveRegion = () => {
            const slide = shower.activeSlide;
            if (slide) {
                liveRegion.innerHTML = slide.element.innerHTML;
            }
        };

        shower.addEventListener('modechange', updateDocumentRole);
        shower.addEventListener('slidechange', updateLiveRegion);
    };

    var keys = (shower) => {
        const doSlideActions = (event) => {
            const isShowerAction = !(event.ctrlKey || event.altKey || event.metaKey);

            switch (event.key.toUpperCase()) {
                case 'ENTER':
                    if (event.metaKey && shower.isListMode) {
                        if (event.shiftKey) {
                            event.preventDefault();
                            shower.first();
                        }

                        break;
                    }

                    event.preventDefault();
                    if (event.shiftKey) {
                        shower.prev();
                    } else {
                        shower.next();
                    }
                    break;

                case 'PAGEUP':
                case 'ARROWUP':
                case 'ARROWLEFT':
                case 'H':
                case 'K':
                case 'P':
                    if (isShowerAction) {
                        event.preventDefault();
                        shower.prev(event.shiftKey);
                    }
                    break;

                case 'PAGEDOWN':
                case 'ARROWDOWN':
                case 'ARROWRIGHT':
                case 'L':
                case 'J':
                case 'N':
                    if (isShowerAction) {
                        event.preventDefault();
                        shower.next(event.shiftKey);
                    }
                    break;

                case ' ':
                    if (isShowerAction && shower.isFullMode) {
                        event.preventDefault();
                        if (event.shiftKey) {
                            shower.prev();
                        } else {
                            shower.next();
                        }
                    }
                    break;

                case 'HOME':
                    event.preventDefault();
                    shower.first();
                    break;

                case 'END':
                    event.preventDefault();
                    shower.last();
                    break;
            }
        };

        const doModeActions = (event) => {
            switch (event.key.toUpperCase()) {
                case 'ESCAPE':
                    if (shower.isFullMode) {
                        event.preventDefault();
                        shower.exitFullMode();
                    }
                    break;

                case 'ENTER':
                    if (event.metaKey && shower.isListMode) {
                        event.preventDefault();
                        shower.enterFullMode();
                    }
                    break;

                case 'P':
                    if (event.metaKey && event.altKey && shower.isListMode) {
                        event.preventDefault();
                        shower.enterFullMode();
                    }
                    break;

                case 'F5':
                    if (event.shiftKey && shower.isListMode) {
                        event.preventDefault();
                        shower.enterFullMode();
                    }
                    break;
            }
        };

        shower.container.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) return;
            if (isInteractiveElement(event.target)) return;

            doSlideActions(event);
            doModeActions(event);
        });
    };

    var location$1 = (shower) => {
        const composeURL = () => {
            const search = shower.isFullMode ? '?full' : '';
            const slide = shower.activeSlide;
            const hash = slide ? `#${slide.id}` : '';

            return location.pathname + search + hash; // path is required to clear search params
        };

        const applyURLMode = () => {
            const isFull = new URL(location).searchParams.has('full');

            freezeHistory(() => {
                if (isFull) {
                    shower.enterFullMode();
                } else {
                    shower.exitFullMode();
                }
            });
        };

        const applyURLSlide = () => {
            const id = location.hash.slice(1);
            if (!id) return;

            const target = shower.slides.find((slide) => slide.id === id);
            if (target) {
                freezeHistory(() => {
                    target.activate();
                });
            } else if (!shower.activeSlide) {
                shower.first(); // invalid hash
            }
        };

        const applyURL = () => {
            applyURLMode();
            applyURLSlide();
        };

        shower.addEventListener('modechange', () => {
            history.replaceState(null, document.title, composeURL());
        });

        shower.addEventListener('slidechange', () => {
            history.pushState(null, document.title, composeURL());
        });

        shower.addEventListener('start', applyURL);
        window.addEventListener('popstate', applyURL);
    };

    var next = (shower) => {
        const { stepSelector, activeSlideClass } = shower.options;

        let innerSteps;
        let innerAt;

        const getInnerSteps = () => {
            const { element } = shower.activeSlide;
            return [...element.querySelectorAll(stepSelector)];
        };

        const getInnerAt = () => {
            return innerSteps.filter((step) => {
                return step.classList.contains(activeSlideClass);
            }).length;
        };

        const toggleActive = () => {
            innerSteps.forEach((step, index) => {
                step.classList.toggle(activeSlideClass, index < innerAt);
            });
        };

        shower.addEventListener('slidechange', () => {
            innerSteps = getInnerSteps();
            innerAt = getInnerAt();

            const slide = shower.activeSlide;
            slide.state.innerStepsCount = innerSteps.length;
        });

        shower.addEventListener('next', (event) => {
            if (event.defaultPrevented || !event.cancelable) return;
            if (shower.isListMode || innerAt === innerSteps.length) return;

            event.preventDefault();
            innerAt++;
            toggleActive();
        });

        shower.addEventListener('prev', (event) => {
            if (event.defaultPrevented || !event.cancelable) return;
            if (shower.isListMode || innerAt === innerSteps.length || !innerAt) return;

            event.preventDefault();
            innerAt--;
            toggleActive();
        });
    };

    var progress = (shower) => {
        const { progressSelector } = shower.options;
        const bar = shower.container.querySelector(progressSelector);
        if (!bar) return;

        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuemin', 0);
        bar.setAttribute('aria-valuemax', 100);

        const updateProgress = () => {
            const index = shower.activeSlideIndex;
            const { length } = shower.slides;
            const progress = (index / (length - 1)) * 100;

            bar.style.width = `${progress}%`;
            bar.setAttribute('aria-valuenow', progress);
            bar.setAttribute('aria-valuetext', `Slideshow progress: ${progress}%`);
        };

        shower.addEventListener('slidechange', updateProgress);
    };

    var scale = (shower) => {
        const { container } = shower;
        const getScale = () => {
            const maxRatio = Math.max(
                container.offsetWidth / window.innerWidth,
                container.offsetHeight / window.innerHeight,
            );

            return `scale(${1 / maxRatio})`;
        };

        const updateStyle = () => {
            container.style.transform = shower.isFullMode ? getScale() : '';
        };

        shower.addEventListener('modechange', updateStyle);
        window.addEventListener('resize', updateStyle);
        window.addEventListener('load', updateStyle);
    };

    const units = ['s', 'm', 'h'];
    const hasUnits = (timing) => {
        return units.some((unit) => timing.includes(unit));
    };

    const parseUnits = (timing) => {
        return units.map((unit) => timing.match(`(\\S+)${unit}`)).map((match) => match && match[1]);
    };

    const parseColons = (timing) => {
        return `::${timing}`.split(':').reverse();
    };

    const SEC_IN_MIN = 60;
    const SEC_IN_HOUR = SEC_IN_MIN * 60;

    var parseTiming = (timing) => {
        if (!timing) return 0;

        const parsed = hasUnits(timing) ? parseUnits(timing) : parseColons(timing);

        let [sec, min, hour] = parsed.map(Number);

        sec += min * SEC_IN_MIN;
        sec += hour * SEC_IN_HOUR;

        return Math.max(sec * 1000, 0);
    };

    var timer = (shower) => {
        let id;

        const setTimer = () => {
            clearTimeout(id);
            if (shower.isListMode) return;

            const slide = shower.activeSlide;
            const { visitsCount, innerStepsCount } = slide.state;
            if (visitsCount > 1) return;

            const timing = parseTiming(slide.element.dataset.timing);
            if (!timing) return;

            if (innerStepsCount) {
                const stepTiming = timing / (innerStepsCount + 1);
                id = setInterval(() => shower.next(), stepTiming);
            } else {
                id = setTimeout(() => shower.next(), timing);
            }
        };

        shower.addEventListener('modechange', setTimer);
        shower.addEventListener('slidechange', setTimer);

        shower.container.addEventListener('keydown', (event) => {
            if (!event.defaultPrevented) {
                clearTimeout(id);
            }
        });
    };

    const mdash = '\u2014';

    var title = (shower) => {
        const { title } = document;
        const updateTitle = () => {
            if (shower.isFullMode) {
                const slide = shower.activeSlide;
                const slideTitle = slide.title;
                if (slideTitle) {
                    document.title = `${slideTitle} ${mdash} ${title}`;
                    return;
                }
            }

            document.title = title;
        };

        shower.addEventListener('modechange', updateTitle);
        shower.addEventListener('slidechange', updateTitle);
    };

    var view = (shower) => {
        const { container } = shower;
        const { fullModeClass, listModeClass } = shower.options;

        shower.addEventListener('modechange', () => {
            if (shower.isFullMode) {
                container.classList.remove(listModeClass);
                container.classList.add(fullModeClass);
                return;
            }

            container.classList.remove(fullModeClass);
            container.classList.add(listModeClass);

            const slide = shower.activeSlide;
            if (slide) {
                slide.element.scrollIntoView({ block: 'center' });
            }
        });

        shower.addEventListener('slidechange', () => {
            const slide = shower.activeSlide;
            slide.element.scrollIntoView({ block: 'nearest' });
        });

        shower.addEventListener('start', () => {
            if (container.classList.contains(fullModeClass)) {
                shower.enterFullMode();
            } else {
                container.classList.add(listModeClass);
            }
        });
    };

    var installModules = (shower) => {
        a11y(shower);
        keys(shower); // should come before `timer`
        progress(shower);
        next(shower); // should come before `timer`
        timer(shower);
        title(shower); // should come before `location`
        location$1(shower);
        view(shower);
        scale(shower);
    };

    const ensureSlideId = (slideElement, index) => {
        if (!slideElement.id) {
            slideElement.id = index + 1;
        }
    };

    class Shower extends EventTarget {
        constructor(options) {
            super();

            this._mode = 'list';
            this._isStarted = false;
            this.options = { ...defaultOptions, ...options };
        }

        /**
         * @param {object} options
         */
        configure(options) {
            Object.assign(this.options, options);
        }

        start() {
            if (this._isStarted) return;

            const { containerSelector } = this.options;
            this.container = document.querySelector(containerSelector);
            if (!this.container) {
                throw new Error(`Shower container with selector '${containerSelector}' not found.`);
            }

            this._isStarted = true;
            this._initSlides();

            // maintains invariant: active slide always exists in `full` mode
            this.addEventListener('modechange', () => {
                if (this.isFullMode && !this.activeSlide) {
                    this.first();
                }
            });

            installModules(this);
            this.dispatchEvent(new Event('start'));
        }

        _initSlides() {
            const slideElements = [
                ...this.container.querySelectorAll(this.options.slideSelector),
            ].filter((slideElement) => !slideElement.hidden);

            slideElements.forEach(ensureSlideId);
            this.slides = slideElements.map((slideElement) => {
                const slide = new Slide(slideElement, this.options);

                slide.addEventListener('activate', () => {
                    this._changeActiveSlide(slide);
                });

                slide.element.addEventListener('click', () => {
                    if (this.isListMode) {
                        this.enterFullMode();
                        slide.activate();
                    }
                });

                return slide;
            });
        }

        _changeActiveSlide(next) {
            const prev = this.slides.find((slide) => {
                return slide.isActive && slide !== next;
            });

            if (prev) {
                prev.deactivate();
            }

            const event = new CustomEvent('slidechange', {
                detail: { prev },
            });

            this.dispatchEvent(event);
        }

        get isFullMode() {
            return this._mode === 'full';
        }

        get isListMode() {
            return this._mode === 'list';
        }

        get activeSlide() {
            return this.slides.find((slide) => slide.isActive);
        }

        get activeSlideIndex() {
            return this.slides.findIndex((slide) => slide.isActive);
        }

        /**
         * Slide fills the maximum area.
         */
        enterFullMode() {
            if (!this.isFullMode) {
                this._mode = 'full';
                this.dispatchEvent(new Event('modechange'));
            }
        }

        /**
         * Shower returns into list mode.
         */
        exitFullMode() {
            if (!this.isListMode) {
                this._mode = 'list';
                this.dispatchEvent(new Event('modechange'));
            }
        }

        /**
         * @param {number} index
         */
        goTo(index) {
            const slide = this.slides[index];
            if (slide) {
                slide.activate();
            }
        }

        /**
         * @param {number} delta
         */
        go(delta) {
            this.goTo(this.activeSlideIndex + delta);
        }

        /**
         * @param {boolean=} isForce
         */
        prev(isForce) {
            const prev = new Event('prev', { cancelable: !isForce });
            if (this.dispatchEvent(prev)) {
                this.go(-1);
            }
        }

        /**
         * @param {boolean=} isForce
         */
        next(isForce) {
            const next = new Event('next', { cancelable: !isForce });
            if (this.dispatchEvent(next)) {
                this.go(1);
            }
        }

        first() {
            this.goTo(0);
        }

        last() {
            this.goTo(this.slides.length - 1);
        }
    }

    const options = document.currentScript.dataset;
    const shower = new Shower(options);

    Object.defineProperty(window, 'shower', {
        value: shower,
        configurable: true,
    });

    contentLoaded(() => {
        shower.start();
    });

}());
