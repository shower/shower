/**
 * Core for Shower HTML presentation engine
 * @shower/core v3.2.0, https://github.com/shower/core
 * @copyright 2010–2021 Vadim Makeev, https://pepelsbey.net
 * @license MIT
 */
(function () {
    'use strict';

    const isInteractiveElement = (element) => element.tabIndex !== -1;

    const contentLoaded = (callback) => {
        if (document.currentScript.async) {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    const defineReadOnly = (target, props) => {
        for (const [key, value] of Object.entries(props)) {
            Object.defineProperty(target, key, {
                value,
                writable: false,
                enumerable: true,
                configurable: true,
            });
        }
    };

    class ShowerError extends Error {}

    var defaultOptions = {
        containerSelector: '.shower',
        progressSelector: '.progress',
        stepSelector: '.next',
        fullModeClass: 'full',
        listModeClass: 'list',
        mouseHiddenClass: 'pointless',
        mouseInactivityTimeout: 5000,

        slideSelector: '.slide',
        slideTitleSelector: 'h2',
        activeSlideClass: 'active',
        visitedSlideClass: 'visited',
    };

    class Slide extends EventTarget {
        /**
         * @param {Shower} shower
         * @param {HTMLElement} element
         */
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
            this._options = this.shower.options;

            this.element.addEventListener('click', (event) => {
                if (event.defaultPrevented) return;

                this.activate();
                this.shower.enterFullMode();
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

        /**
         * Deactivates currently active slide (if any) and activates itself.
         * @emits Slide#deactivate
         * @emits Slide#activate
         * @emits Shower#slidechange
         */
        activate() {
            if (this._isActive) return;

            const prev = this.shower.activeSlide;
            if (prev) {
                prev._deactivate();
            }

            this.state.visitCount++;
            this.element.classList.add(this._options.activeSlideClass);

            this._isActive = true;
            this.dispatchEvent(new Event('activate'));
            this.shower.dispatchEvent(
                new CustomEvent('slidechange', {
                    detail: { prev },
                }),
            );
        }

        /**
         * @throws {ShowerError}
         * @emits Slide#deactivate
         */
        deactivate() {
            if (this.shower.isFullMode) {
                throw new ShowerError('In full mode, another slide should be activated instead.');
            }

            if (this._isActive) {
                this._deactivate();
            }
        }

        _deactivate() {
            this.element.classList.replace(
                this._options.activeSlideClass,
                this._options.visitedSlideClass,
            );

            this._isActive = false;
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

        shower.addEventListener('start', () => {
            updateDocumentRole();
            updateLiveRegion();
        });

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

                case 'BACKSPACE':
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
            const isFull = new URLSearchParams(location.search).has('full');
            if (isFull) {
                shower.enterFullMode();
            } else {
                shower.exitFullMode();
            }
        };

        const applyURLSlide = () => {
            const id = location.hash.slice(1);
            if (!id) return;

            const target = shower.slides.find((slide) => slide.id === id);
            if (target) {
                target.activate();
            } else if (!shower.activeSlide) {
                shower.first(); // invalid hash
            }
        };

        const applyURL = () => {
            applyURLMode();
            applyURLSlide();
        };

        applyURL();
        window.addEventListener('popstate', applyURL);

        shower.addEventListener('start', () => {
            history.replaceState(null, document.title, composeURL());
        });

        shower.addEventListener('modechange', () => {
            history.replaceState(null, document.title, composeURL());
        });

        shower.addEventListener('slidechange', () => {
            const url = composeURL();
            if (!location.href.endsWith(url)) {
                history.pushState(null, document.title, url);
            }
        });
    };

    var next = (shower) => {
        const { stepSelector, activeSlideClass, visitedSlideClass } = shower.options;

        let innerSteps;
        let activeIndex;

        const isActive = (step) => step.classList.contains(activeSlideClass);
        const isVisited = (step) => step.classList.contains(visitedSlideClass);

        const setInnerStepsState = () => {
            if (shower.isListMode) return;

            const slide = shower.activeSlide;

            innerSteps = [...slide.element.querySelectorAll(stepSelector)];
            activeIndex =
                innerSteps.length && innerSteps.every(isVisited)
                    ? innerSteps.length
                    : innerSteps.filter(isActive).length - 1;

            slide.state.innerStepCount = innerSteps.length;
        };

        shower.addEventListener('start', setInnerStepsState);
        shower.addEventListener('modechange', setInnerStepsState);
        shower.addEventListener('slidechange', setInnerStepsState);

        shower.addEventListener('next', (event) => {
            if (shower.isListMode || event.defaultPrevented || !event.cancelable) return;

            activeIndex++;
            innerSteps.forEach((step, index) => {
                step.classList.toggle(visitedSlideClass, index < activeIndex);
                step.classList.toggle(activeSlideClass, index === activeIndex);
            });

            if (activeIndex < innerSteps.length) {
                event.preventDefault();
            }
        });

        shower.addEventListener('prev', (event) => {
            if (shower.isListMode || event.defaultPrevented || !event.cancelable) return;
            if (activeIndex === -1 || activeIndex === innerSteps.length) return;

            activeIndex--;
            innerSteps.forEach((step, index) => {
                step.classList.toggle(visitedSlideClass, index < activeIndex + 1);
                step.classList.toggle(activeSlideClass, index === activeIndex);
            });

            event.preventDefault();
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

        shower.addEventListener('start', updateProgress);
        shower.addEventListener('slidechange', updateProgress);
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

        const resetTimer = () => {
            clearTimeout(id);
            if (shower.isListMode) return;

            const slide = shower.activeSlide;
            const { visitCount, innerStepCount } = slide.state;
            if (visitCount > 1) return;

            const timing = parseTiming(slide.element.dataset.timing);
            if (!timing) return;

            if (innerStepCount) {
                const stepTiming = timing / (innerStepCount + 1);
                id = setInterval(() => shower.next(), stepTiming);
            } else {
                id = setTimeout(() => shower.next(), timing);
            }
        };

        shower.addEventListener('start', resetTimer);
        shower.addEventListener('modechange', resetTimer);
        shower.addEventListener('slidechange', resetTimer);

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

        shower.addEventListener('start', updateTitle);
        shower.addEventListener('modechange', updateTitle);
        shower.addEventListener('slidechange', updateTitle);
    };

    var view = (shower) => {
        const { container } = shower;
        const { fullModeClass, listModeClass } = shower.options;

        if (container.classList.contains(fullModeClass)) {
            shower.enterFullMode();
        } else {
            container.classList.add(listModeClass);
        }

        const updateScale = () => {
            const firstSlide = shower.slides[0];
            if (!firstSlide) return;

            const { innerWidth, innerHeight } = window;
            const { offsetWidth, offsetHeight } = firstSlide.element;

            const listScale = 1 / (offsetWidth / innerWidth);
            const fullScale = 1 / Math.max(offsetWidth / innerWidth, offsetHeight / innerHeight);

            container.style.setProperty('--shower-list-scale', listScale);
            container.style.setProperty('--shower-full-scale', fullScale);
        };

        const updateModeView = () => {
            if (shower.isFullMode) {
                container.classList.remove(listModeClass);
                container.classList.add(fullModeClass);
            } else {
                container.classList.remove(fullModeClass);
                container.classList.add(listModeClass);
            }

            updateScale();

            if (shower.isFullMode) return;

            const slide = shower.activeSlide;
            if (slide) {
                slide.element.scrollIntoView({ block: 'center' });
            }
        };

        shower.addEventListener('start', updateModeView);
        shower.addEventListener('modechange', updateModeView);
        shower.addEventListener('slidechange', () => {
            if (shower.isFullMode) return;

            const slide = shower.activeSlide;
            slide.element.scrollIntoView({ block: 'nearest' });
        });

        window.addEventListener('resize', updateScale);
    };

    var touch = (shower) => {
        let exitFullScreen = false;
        let clickable = false;

        document.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                const touch = event.touches[0];
                const x = touch.clientX;
                const { target } = touch;
                clickable = target.tabIndex !== -1;
                if (!clickable) {
                    if (shower.isFullMode) {
                        if (event.cancelable) event.preventDefault();
                        if (window.innerWidth / 2 < x) {
                            shower.next();
                        } else {
                            shower.prev();
                        }
                    }
                }
            } else if (event.touches.length === 3) {
                exitFullScreen = true;
            }
        });

        shower.container.addEventListener('touchend', (event) => {
            if (exitFullScreen) {
                event.preventDefault();
                exitFullScreen = false;
                shower.exitFullMode();
            } else if (event.touches.length === 1 && !clickable && shower.isFullMode)
                event.preventDefault();
        });
    };

    var mouse = (shower) => {
        const { mouseHiddenClass, mouseInactivityTimeout } = shower.options;

        let hideMouseTimeoutId = null;

        const cleanUp = () => {
            shower.container.classList.remove(mouseHiddenClass);
            clearTimeout(hideMouseTimeoutId);
            hideMouseTimeoutId = null;
        };

        const hideMouseIfInactive = () => {
            if (hideMouseTimeoutId !== null) {
                cleanUp();
            }

            hideMouseTimeoutId = setTimeout(() => {
                shower.container.classList.add(mouseHiddenClass);
            }, mouseInactivityTimeout);
        };

        const initHideMouseIfInactiveModule = () => {
            shower.container.addEventListener('mousemove', hideMouseIfInactive);
        };

        const destroyHideMouseIfInactiveModule = () => {
            shower.container.removeEventListener('mousemove', hideMouseIfInactive);
            cleanUp();
        };

        const handleModeChange = () => {
            if (shower.isFullMode) {
                initHideMouseIfInactiveModule();
            } else {
                destroyHideMouseIfInactiveModule();
            }
        };

        shower.addEventListener('start', handleModeChange);
        shower.addEventListener('modechange', handleModeChange);
    };

    var installModules = (shower) => {
        a11y(shower);
        progress(shower);
        keys(shower);
        next(shower);
        timer(shower); // should come after `keys` and `next`
        title(shower);
        location$1(shower); // should come after `title`
        view(shower);
        touch(shower);
        mouse(shower);

        // maintains invariant: active slide always exists in `full` mode
        if (shower.isFullMode && !shower.activeSlide) {
            shower.first();
        }
    };

    class Shower extends EventTarget {
        /**
         * @param {object=} options
         */
        constructor(options) {
            super();

            defineReadOnly(this, {
                options: { ...defaultOptions, ...options },
            });

            this._mode = 'list';
            this._isStarted = false;
            this._container = null;
        }

        /**
         * @param {object=} options
         * @throws {ShowerError}
         */
        configure(options) {
            if (this._isStarted) {
                throw new ShowerError('Shower should be configured before it is started.');
            }

            Object.assign(this.options, options);
        }

        /**
         * @throws {ShowerError}
         * @emits Shower#start
         */
        start() {
            if (this._isStarted) return;

            const { containerSelector } = this.options;
            this._container = document.querySelector(containerSelector);
            if (!this._container) {
                throw new ShowerError(
                    `Shower container with selector '${containerSelector}' was not found.`,
                );
            }

            this._initSlides();
            installModules(this);

            this._isStarted = true;
            this.dispatchEvent(new Event('start'));
        }

        _initSlides() {
            const visibleSlideSelector = `${this.options.slideSelector}:not([hidden])`;
            const visibleSlideElements = this._container.querySelectorAll(visibleSlideSelector);

            this.slides = Array.from(visibleSlideElements, (slideElement, index) => {
                if (!slideElement.id) {
                    slideElement.id = index + 1;
                }

                return new Slide(this, slideElement);
            });
        }

        _setMode(mode) {
            if (mode === this._mode) return;

            this._mode = mode;
            this.dispatchEvent(new Event('modechange'));
        }

        /**
         * @param {Event} event
         */
        dispatchEvent(event) {
            if (!this._isStarted) return false;

            return super.dispatchEvent(event);
        }

        get container() {
            return this._container;
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
         * @emits Shower#modechange
         */
        enterFullMode() {
            this._setMode('full');
        }

        /**
         * Shower returns into list mode.
         * @emits Shower#modechange
         */
        exitFullMode() {
            this._setMode('list');
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
        goBy(delta) {
            this.goTo(this.activeSlideIndex + delta);
        }

        /**
         * @param {boolean} [isForce=false]
         * @emits Shower#prev
         */
        prev(isForce) {
            const prev = new Event('prev', { cancelable: !isForce });
            if (this.dispatchEvent(prev)) {
                this.goBy(-1);
            }
        }

        /**
         * @param {boolean} [isForce=false]
         * @emits Shower#next
         */
        next(isForce) {
            const next = new Event('next', { cancelable: !isForce });
            if (this.dispatchEvent(next)) {
                this.goBy(1);
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

})();
