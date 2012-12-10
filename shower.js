window.shower = (function(window, document, undefined) {
	var shower = {},
		url = window.location,
		body = document.body,
		slides = document.querySelectorAll('.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [],
		timer,
		isHistoryApiSupported = !!(window.history && history.pushState),
		l = slides.length, i;

	/**
	* Get value at named data store for the DOM element.
	* @private
	* @param {domElem} element
	* @param {string} name
	* @returns {string}
	*/
	shower._getData = function(element, name) {
		return element.dataset ? element.dataset[name] : element.getAttribute('data-' + name);
	}

	for (i = 0; i < l; i++) {
		// Slide ID's are optional. In case of missing ID we set it to the
		// slide number
		if ( ! slides[i].id) {
			slides[i].id = i + 1;
		}

		slideList.push({
			id: slides[i].id,
			hasInnerNavigation: null !== slides[i].querySelector('.next'),
			hasTiming: (shower._getData(slides[i], 'timing') && shower._getData(slides[i], 'timing').indexOf(':') !== -1)
		});
	}

	/**
	* Get slide scale value
	* @private
	* @returns {String}
	*/
	shower._getTransform = function() {
		var denominator = Math.max(
			body.clientWidth / window.innerWidth,
			body.clientHeight / window.innerHeight
		);

		return 'scale(' + (1 / denominator) + ')';
	};

	/**
	* Set CSS transform with prefixes to body
	* @private
	* @returns {true}
	*/
	shower._applyTransform = function(transform) {
		body.style.WebkitTransform = transform;
		body.style.MozTransform = transform;
		body.style.msTransform = transform;
		body.style.OTransform = transform;
		body.style.transform = transform;

		return true;
	};

	/**
	* Show next slide. If slide is last returns false, otherwise return slide
	* number which been shown.
	* @returns {number|false}
	*/
	shower.next = function () {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			ret;

		// Only go to next slide if current slide have no inner
		// navigation or inner navigation is fully shown
		// NOTE: But first of all check if there is no current slide
		if (
			-1 === currentSlideNumber ||
			!slideList[currentSlideNumber].hasInnerNavigation ||
			-1 === shower.increaseInnerNavigation(currentSlideNumber)
		) {
			shower.go(currentSlideNumber + 1);
			// slides starts from 0
			ret = currentSlideNumber + 2;
		} else {
			ret = false;
		}

		return ret;
	};

	/**
	* Show previous slide. If slide is first returns false, otherwise return slide
	* number which been shown.
	* @returns {number|false}
	*/
	shower.previous = function () {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			ret;

		// slides starts from 0
		if (currentSlideNumber > 0) {
			ret = currentSlideNumber;
			shower.go(currentSlideNumber - 1);
		} else {
			ret = false;
		}

		return ret;
	};

	/**
	* Show first slide.
	* @returns {number}
	*/
	shower.first = function() {
		return shower.go(0);
	};

	/**
	* Show last slide.
	* @returns {number}
	*/
	shower.last = function() {
		return shower.go(slideList.length - 1);
	};

	/**
	* Switch to slide view.
	* @returns {number}
	*/
	shower.enterSlideMode = function() {
		// @TODO: check if it's already in slide mode...
		body.classList.remove('list');
		body.classList.add('full');
		return shower._applyTransform(shower._getTransform());
	};

	/**
	* Switch to list view.
	* @returns {number}
	*/
	shower.enterListMode = function() {
		// @TODO: check if it's already in list mode...
		body.classList.remove('full');
		body.classList.add('list');
		return shower._applyTransform('none');
	};

	// @TODO: add method shower.toggleMode()

	/**
	* Get current slide number. Starts from zero. Warning: when in url you have
	* slide number 1 this method will return 0.
	* If something wrong return -1.
	* @returns {number}
	*/
	shower.getCurrentSlideNumber = function() {
		var i = slideList.length - 1,
			currentSlideId = url.hash.substr(1);

		// As fast as you can ;-)
		// http://jsperf.com/for-vs-foreach/46
		for (; i >= 0; --i) {
			if (currentSlideId === slideList[i].id) {
				return i;
			}
		}

		return -1;
	};

	/**
	* Check if arg is number.
	* @private
	* @param {number|whatelse} arg Any type
	* @returns {boolean}
	*/
	shower._isNumber = function(arg) {
		if(! ( ! isNaN(parseFloat(arg)) && isFinite(arg))) {
			return false;
		}

		return true;
	};

	/**
	* Scroll to slide.
	* @param {number} slideNumber slide number (sic!)
	* @returns {undefined|boolean}
	*/
	shower.scrollToSlide = function(slideNumber) {
		var currentSlide,
			ret;

		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		if( ! shower.isListMode()) {
			throw new Error('You can\'t to scroll cause you in slide mode. Please, switch to list mode.');
		}

		// @TODO: WTF?
		if (-1 === slideNumber) {
			return;
		}

		if (slideList[slideNumber]) {
			currentSlide = document.getElementById(slideList[slideNumber].id);
			window.scrollTo(0, currentSlide.offsetTop);
			ret = true;
		} else {
			throw new Error('There is no slide with number ' + slideNumber);
		}

		return ret;
	};

	/**
	* Chech if it's list mode.
	* @returns {boolean}
	*/
	shower.isListMode = function() {
		return isHistoryApiSupported ? ! /^full.*/.test(url.search.substr(1)) : body.classList.contains('list');
	};

	/**
	* Normalize slide number.
	* @private
	* @param {number} slideNumber slide number (sic!)
	* @returns {number}
	*/
	shower._normalizeSlideNumber = function(slideNumber) {
		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		if (slideNumber < 0) {
			slideNumber = 0;
		}

		if (slideNumber >= slideList.length) {
			slideNumber = slideList.length - 1;
		}

		return slideNumber;
	};

	/**
	* Update progress bar.
	* @param {number} slideNumber slide number (sic!)
	* @returns {boolean}
	*/
	shower.updateProgress = function(slideNumber) {
		// if progress bar doesn't exist
		if (null === progress) {
			return false;
		}

		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		progress.style.width = (100 / (slideList.length - 1) * shower._normalizeSlideNumber(slideNumber)).toFixed(2) + '%';

		return true;
	};

	/**
	* Update current and passed slides.
	* @param {number} slideNumber slide number (sic!)
	* @returns {boolean}
	*/
	shower.updateCurrentAndPassedSlides = function(slideNumber) {
		var i,
			slide,
			l = slideList.length;

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		for (i = 0; i < l; ++i) {
			slide = document.getElementById(slideList[i].id);

			if (i < slideNumber) {
				slide.classList.remove('current');
				slide.classList.add('passed');
			} else if (i > slideNumber) {
				slide.classList.remove('passed');
				slide.classList.remove('current');
			} else {
				slide.classList.remove('passed');
				slide.classList.add('current');
			}
		}

		return true;
	};

	/**
	* Get slide hash.
	* @param {number} slideNumber slide number (sic!). Attention: starts from zero.
	* @returns {boolean}
	*/
	shower.getSlideHash = function(slideNumber) {
		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		return '#' + slideList[slideNumber].id;
	};

	/**
	* Go to slide number...
	* @param {number} slideNumber slide number (sic!). Attention: starts from zero.
	* @returns {number}
	*/
	shower.go = function(slideNumber) {
		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		url.hash = shower.getSlideHash(slideNumber);

		if ( ! shower.isListMode()) {
			shower.updateProgress(slideNumber);
			shower.updateCurrentAndPassedSlides(slideNumber);
		}

		return slideNumber;
	};

	/**
	* Get containing slide id.
	* @private
	* @param {domElem} el
	* @returns {string}
	*/
	shower._getContainingSlideId = function(el) {
		while ('BODY' !== el.nodeName && 'HTML' !== el.nodeName) {
			if (el.classList.contains('slide')) {
				return el.id;
			} else {
				el = el.parentNode;
			}
		}

		return '';
	};

	/**
	* Dispatch single slide mode.
	* @TODO: Renaming needed? Or just some handlers rewriting?
	* @private
	* @param {domElem} e
	* @returns {undefined}
	*/
	shower._dispatchSingleSlideMode = function(e) {
		// Process links
		// @TODO: presentation links support
		if ('A' === e.target.nodeName) {
			e.preventDefault();

			window.open(e.target.getAttribute('href'));
			return;
		}

		var slideId = shower._getContainingSlideId(e.target);

		if ('' !== slideId && shower.isListMode()) {
			e.preventDefault();

			// NOTE: we should update hash to get things work properly
			url.hash = '#' + slideId;
			if (isHistoryApiSupported) {
				history.replaceState(null, null, url.pathname + '?full#' + slideId);
			}
			shower.enterSlideMode();

			shower.updateProgress(shower.getCurrentSlideNumber());
			shower.updateCurrentAndPassedSlides(shower.getCurrentSlideNumber());
			shower.runSlideshowIfPresented(shower.getCurrentSlideNumber());
		}

		return;
	};

	/**
	* Run slide show in presented.
	* @param {number} slideNumber
	* @returns {undefined}
	*/
	shower.runSlideshowIfPresented = function(slideNumber) {
		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		clearTimeout(timer);

		if (slideList[slideNumber].hasTiming) {
			// Compute number of milliseconds from format "X:Y", where X is
			// number of minutes, and Y is number of seconds
			var timing = shower._getData(document.getElementById(slideList[slideNumber].id), 'timing').split(':');
			timing = parseInt(timing[0], 10) * 60 * 1000 + parseInt(timing[1], 10) * 1000;

			timer = setTimeout(function() {
					shower.go(slideNumber + 1);
					shower.runSlideshowIfPresented(slideNumber + 1);
				},
				timing);
		}
	};

	/**
	* Increases inner navigation by adding 'active' class to next inactive inner navigation item
	* @param {number} slideNumber
	* @returns {number}
	*/
	shower.increaseInnerNavigation = function(slideNumber) {
		var nextNodes,
			node,
			ret = -1;

		if( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as number, baby!');
		}

		// If inner navigation in this slide...
		if (slideList[slideNumber].hasInnerNavigation) {
			nextNodes = document.getElementById(slideList[slideNumber].id).querySelectorAll('.next:not(.active)');

			if (0 !== nextNodes.length) {
				node = nextNodes[0];
				node.classList.add('active');
				ret = nextNodes.length - 1;
			}
		}

		return ret;
	};




	// Event handlers

	window.addEventListener('DOMContentLoaded', function () {
		if ( ! shower.isListMode()) {
			// "?full" is present without slide hash, so we should display first slide
			if (-1 === shower.getCurrentSlideNumber()) {
				if (isHistoryApiSupported) {
					history.replaceState(null, null, url.pathname + '?full' + shower.getSlideHash(0));
				}
			}

			shower.enterSlideMode();
			shower.updateProgress(shower.getCurrentSlideNumber());
			shower.updateCurrentAndPassedSlides(shower.getCurrentSlideNumber());
			shower.runSlideshowIfPresented(shower.getCurrentSlideNumber());
		}
	}, false);

	window.addEventListener('popstate', function (e) {
		if (shower.isListMode()) {
			shower.enterListMode();
			shower.scrollToSlide(shower.getCurrentSlideNumber());
		} else {
			shower.enterSlideMode();
		}
	}, false);

	window.addEventListener('resize', function (e) {
		if ( ! shower.isListMode()) {
			shower._applyTransform(shower._getTransform());
		}
	}, false);

	document.addEventListener('keydown', function (e) {
		// Shortcut for alt, ctrl and meta keys
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var currentSlideNumber = shower.getCurrentSlideNumber(),
			innerNavigationCompleted = true;

		switch (e.which) {
			case 116: // F5
				e.preventDefault();

				if (shower.isListMode()) {
					var slideNumber = e.shiftKey ? currentSlideNumber : 0;

					shower.go(slideNumber);

					if (isHistoryApiSupported) {
						history.pushState(null, null, url.pathname + '?full' + shower.getSlideHash(slideNumber));
					}
					shower.enterSlideMode();

					shower.updateProgress(slideNumber);
					shower.updateCurrentAndPassedSlides(slideNumber);
					shower.runSlideshowIfPresented(slideNumber);
				} else {
					if (isHistoryApiSupported) {
						history.pushState(null, null, url.pathname + shower.getSlideHash(currentSlideNumber));
					}
					shower.enterListMode();
					shower.scrollToSlide(currentSlideNumber);
				}
			break;

			case 13: // Enter
				if (shower.isListMode() && -1 !== currentSlideNumber) {
					e.preventDefault();

					if (isHistoryApiSupported) {
						history.pushState(null, null, url.pathname + '?full' + shower.getSlideHash(currentSlideNumber));
					}
					shower.enterSlideMode();

					shower.updateProgress(currentSlideNumber);
					shower.updateCurrentAndPassedSlides(currentSlideNumber);
					shower.runSlideshowIfPresented(currentSlideNumber);
				}
			break;

			case 27: // Esc
				if ( ! shower.isListMode()) {
					e.preventDefault();

					if (isHistoryApiSupported) {
						history.pushState(null, null, url.pathname + shower.getSlideHash(currentSlideNumber));
					}
					shower.enterListMode();
					shower.scrollToSlide(currentSlideNumber);
				}
			break;

			case 33: // PgUp
			case 38: // Up
			case 37: // Left
			case 72: // h
			case 75: // k
				e.preventDefault();
				shower.previous();
			break;

			case 34: // PgDown
			case 40: // Down
			case 39: // Right
			case 76: // l
			case 74: // j
				e.preventDefault();

				if ( ! shower.isListMode()) {
					// Inner navigation is "completed" if current slide have
					// no inner navigation or inner navigation is fully shown
					innerNavigationCompleted = !slideList[currentSlideNumber].hasInnerNavigation ||
						-1 === shower.increaseInnerNavigation(currentSlideNumber);
				} else {
					// Also inner navigation is always "completed" if we are in
					// list mode
					innerNavigationCompleted = true;
				}
				// NOTE: First of all check if there is no current slide
				if (
					-1 === currentSlideNumber || innerNavigationCompleted
				) {
					currentSlideNumber++;
					shower.go(currentSlideNumber);
					// We must run slideshow only in full mode
					if ( ! shower.isListMode()) {
						shower.runSlideshowIfPresented(currentSlideNumber);
					}
				}
			break;

			case 36: // Home
				e.preventDefault();

				shower.first();
			break;

			case 35: // End
				e.preventDefault();

				shower.last();
			break;

			case 9: // Tab = +1; Shift + Tab = -1
			case 32: // Space = +1; Shift + Space = -1
				e.preventDefault();

				shower[e.shiftKey ? 'previous' : 'next']();
			break;

			default:
				// Behave as usual
		}
	}, false);

	document.addEventListener('click', shower._dispatchSingleSlideMode, false);
	document.addEventListener('touchend', shower._dispatchSingleSlideMode, false);

	document.addEventListener('touchstart', function (e) {
		if ( ! shower.isListMode()) {
			var currentSlideNumber = shower.getCurrentSlideNumber(),
				x = e.touches[0].pageX;
			if (x > window.innerWidth / 2) {
				currentSlideNumber++;
			} else {
				currentSlideNumber--;
			}

			shower.go(currentSlideNumber);
		}
	}, false);

	document.addEventListener('touchmove', function (e) {
		if ( ! shower.isListMode()) {
			e.preventDefault();
		}
	}, false);

	return shower;

})(this, this.document);
