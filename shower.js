/**
 * Shower HTML presentation engine: github.com/shower/shower
 * @copyright 2010–2013 Vadim Makeev, pepelsbey.net
 * @license MIT license: github.com/shower/shower/wiki/MIT-License
 */
window.shower = window.shower || (function(window, document, undefined) {
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
	* @param {HTMLElement} element
	* @param {String} name
	* @returns {String}
	*/
	shower._getData = function(element, name) {
		return element.dataset ? element.dataset[name] : element.getAttribute('data-' + name);
	};

	for (i = 0; i < l; i++) {
		// Slide IDs are optional. In case of missing ID we set it to the
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
	* Get slide scale value.
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
	* Set CSS transform with prefixes to body.
	* @private
	* @returns {Boolean}
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
	* Check if arg is number.
	* @private
	* @param {String|Number} arg
	* @returns {Boolean}
	*/
	shower._isNumber = function(arg) {
		return ! isNaN(parseFloat(arg)) && isFinite(arg);
	};

	/**
	* Normalize slide number.
	* @private
	* @param {Number} slideNumber slide number (sic!)
	* @returns {Number}
	*/
	shower._normalizeSlideNumber = function(slideNumber) {
		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
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
	* Get slide id from HTML element.
	* @private
	* @param {HTMLElement} el
	* @returns {String}
	*/
	shower._getSlideIdByEl = function(el) {
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
	* For touch devices: check if link is clicked.
	*
	* @TODO: add support for textareas/inputs/etc.
	*
	* @private
	* @param {HTMLElement} e
	* @returns {Boolean}
	*/
	shower._checkInteractiveElement = function(e) {
		return 'A' === e.target.nodeName;
	};

	/**
	* Get slide number by slideId.
	* @param {String} slideId (HTML id or position in slideList)
	* @returns {Number}
	*/
	shower.getSlideNumber = function(slideId) {
		var i = slideList.length - 1,
			slideNumber;

		if (slideId === '') {
			slideNumber = 0;
		}

		// As fast as you can ;-)
		// http://jsperf.com/for-vs-foreach/46
		for (; i >= 0; --i) {
			if (slideId === slideList[i].id) {
				slideNumber = i;
				break;
			}
		}

		return slideNumber;
	};

	/**
	* Go to slide number.
	* @param {Number} slideNumber slide number (sic!). Attention: starts from zero.
	* @param {Function} [callback] runs only if you not in List mode.
	* @returns {Number}
	*/
	shower.go = function(slideNumber, callback) {
		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		// Also triggers popstate and invoke shower.enter__Mode()
		url.hash = shower.getSlideHash(slideNumber);

		shower.updateProgress(slideNumber);
		shower.updateActiveAndVisitedSlides(slideNumber);

		if (shower.isSlideMode()) {
			shower.showPresenterNotes(slideNumber);
			shower.runInnerNavigation(slideNumber);
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return slideNumber;
	};

	/**
	* Show next slide or show next Inner navigation item.
	* Returns false on a last slide, otherwise returns shown slide number.
	* @param {Function} [callback] runs only if shower.next() is successfully completed.
	* @returns {Number|Boolean}
	*/
	shower.next = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			ret = false;

		// Only go to next slide if current slide have no inner
		// navigation or inner navigation is fully shown
		// NOTE: But first of all check if there is no current slide
		if (
			(
				-1 === currentSlideNumber ||
				! slideList[currentSlideNumber].hasInnerNavigation ||
				! shower.increaseInnerNavigation(currentSlideNumber)
			) &&
			// If exist next slide
			(currentSlideNumber + 2) <= slideList.length
		) {
			shower.go(currentSlideNumber + 1);
			// Slides starts from 0. So return next slide number.
			ret = currentSlideNumber + 2;
		}

		if (shower.isSlideMode()) {
			shower.runInnerNavigation(currentSlideNumber + 1);
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return ret;
	};

	/**
	* Show previous slide. Returns false on a first slide, otherwise returns shown slide number.
	* @param {Function} [callback] runs only if shower.previous() is successfully completed.
	* @returns {Number|Boolean}
	*/
	shower.previous = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			ret = false;

		// slides starts from 0
		if (currentSlideNumber > 0) {
			ret = currentSlideNumber;
			shower.go(currentSlideNumber - 1);

			if (typeof(callback) === 'function') {
				callback();
			}
		}

		return ret;
	};

	/**
	* Show first slide.
	* @param {Function} [callback]
	* @returns {Number}
	*/
	shower.first = function(callback) {
		if (typeof(callback) === 'function') {
			callback();
		}

		return shower.go(0);
	};

	/**
	* Show last slide.
	* @param {Function} [callback]
	* @returns {Number}
	*/
	shower.last = function(callback) {
		if (typeof(callback) === 'function') {
			callback();
		}
		return shower.go(slideList.length - 1);
	};

	/**
	* Switch to slide view.
	* @param {Function} [callback] runs only if shower.enterSlideMode() is successfully completed.
	* @returns {Boolean}
	*/
	shower.enterSlideMode = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber();

		// Anyway: change body class (@TODO: refactoring)
		body.classList.remove('list');
		body.classList.add('full');

		// Preparing URL for shower.go()
		if (shower.isListMode() && isHistoryApiSupported) {
			history.pushState(null, null, url.pathname + '?full' + shower.getSlideHash(currentSlideNumber));
		}

		shower._applyTransform(shower._getTransform());

		if (typeof(callback) === 'function') {
			callback();
		}

		return true;
	};

	/**
	* Switch to list view.
	* @param {Function} [callback] runs only if shower.enterListMode() is successfully completed.
	* @returns {Boolean}
	*/
	shower.enterListMode = function(callback) {
		// Anyway: change body class (@TODO: refactoring)
		body.classList.remove('full');
		body.classList.add('list');

		shower.clearPresenterNotes();

		if (shower.isListMode()) {
			return false;
		}

		var currentSlideNumber = shower.getCurrentSlideNumber();

		clearTimeout(timer);

		if (shower.isSlideMode() && isHistoryApiSupported) {
			history.pushState(null, null, url.pathname + shower.getSlideHash(currentSlideNumber));
		}

		shower.scrollToSlide(currentSlideNumber);
		shower._applyTransform('none');

		if (typeof(callback) === 'function') {
			callback();
		}

		return true;
	};

	/**
	* Toggle Mode: Slide and List.
	* @param {Function} [callback]
	*/
	shower.toggleMode = function(callback) {
		if (shower.isListMode()) {
			shower.enterSlideMode();
		} else {
			shower.enterListMode();
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return true;
	};

	/**
	* Get current slide number. Starts from zero. Warning: when you have
	* slide number 1 in URL this method will return 0.
	* If something is wrong return -1.
	* @returns {Number}
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
	* Scroll to slide.
	* @param {Number} slideNumber slide number (sic!)
	* @returns {Boolean}
	*/
	shower.scrollToSlide = function(slideNumber) {
		var currentSlide,
			ret = false;

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		if (shower.isSlideMode()) {
			throw new Error('You can\'t scroll to because you in slide mode. Please, switch to list mode.');
		}

		// @TODO: WTF?
		if (-1 === slideNumber) {
			return ret;
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
	* Check if it's List mode.
	* @returns {Boolean}
	*/
	shower.isListMode = function() {
		return isHistoryApiSupported ? ! /^full.*/.test(url.search.substr(1)) : body.classList.contains('list');
	};

	/**
	* Check if it's Slide mode.
	* @returns {Boolean}
	*/
	shower.isSlideMode = function() {
		return isHistoryApiSupported ? /^full.*/.test(url.search.substr(1)) : body.classList.contains('full');
	};

	/**
	* Update progress bar.
	* @param {Number} slideNumber slide number (sic!)
	* @returns {Boolean}
	*/
	shower.updateProgress = function(slideNumber) {
		// if progress bar doesn't exist
		if (null === progress) {
			return false;
		}

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		progress.style.width = (100 / (slideList.length - 1) * shower._normalizeSlideNumber(slideNumber)).toFixed(2) + '%';

		return true;
	};

	/**
	* Update active and visited slides.
	* @param {Number} slideNumber slide number (sic!)
	* @returns {Boolean}
	*/
	shower.updateActiveAndVisitedSlides = function(slideNumber) {
		var i,
			slide,
			l = slideList.length;

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		for (i = 0; i < l; ++i) {
			slide = document.getElementById(slideList[i].id);

			if (i < slideNumber) {
				slide.classList.remove('active');
				slide.classList.add('visited');
			} else if (i > slideNumber) {
				slide.classList.remove('visited');
				slide.classList.remove('active');
			} else {
				slide.classList.remove('visited');
				slide.classList.add('active');
			}
		}

		return true;
	};

	/**
	* Clear presenter notes in console.
	*/
	shower.clearPresenterNotes = function() {
		if (window.console && window.console.clear) {
			console.clear();
		}
	};

	/**
	* Show presenter notes in console.
	* @param {Number} slideNumber slide number (sic!). Attention: starts from zero.
	*/
	shower.showPresenterNotes = function(slideNumber) {
		shower.clearPresenterNotes();

		if (window.console) {
			slideNumber = shower._normalizeSlideNumber(slideNumber);

			var slideId = slideList[slideNumber].id,
				nextSlideId = slideList[slideNumber + 1] ? slideList[slideNumber + 1].id : null,
				notes = document.getElementById(slideId).querySelector('footer');

			if (notes && notes.innerHTML) {
				console.info(notes.innerHTML.replace(/\n\s+/g,'\n'));
			}

			if (nextSlideId) {

				var next = document.getElementById(nextSlideId).querySelector('h2');

				if (next) {
					next = next.innerHTML.replace(/^\s+|<[^>]+>/g,'');
					console.info('NEXT: ' + next);
				}
			}
		}
	};

	/**
	* Get slide hash.
	* @param {Number} slideNumber slide number (sic!). Attention: starts from zero.
	* @returns {String}
	*/
	shower.getSlideHash = function(slideNumber) {
		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		return '#' + slideList[slideNumber].id;
	};

	/**
	* Run slide show if presented.
	* @param {Number} slideNumber
	* @returns {Boolean}
	*/
	shower.runInnerNavigation = function(slideNumber) {
		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		clearTimeout(timer);

		if (slideList[slideNumber].hasTiming) {
			// Compute number of milliseconds from format "X:Y", where X is
			// number of minutes, and Y is number of seconds
			var timing = shower._getData(document.getElementById(slideList[slideNumber].id), 'timing').split(':');
			timing = parseInt(timing[0], 10) * 60 * 1000 + parseInt(timing[1], 10) * 1000;

			timer = setTimeout(function() {
					shower.next();
				},
				timing);
		}

		return true;
	};

	/**
	* Increases inner navigation by adding 'active' class to next inactive inner navigation item
	* @param {Number} slideNumber
	* @returns {Boolean}
	*/
	shower.increaseInnerNavigation = function(slideNumber) {
		var nextNodes,
			node;

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		// If inner navigation in this slide
		if (slideList[slideNumber].hasInnerNavigation) {
			nextNodes = document.getElementById(slideList[slideNumber].id).querySelectorAll('.next:not(.active)');

			if (0 !== nextNodes.length) {
				node = nextNodes[0];
				node.classList.add('active');
				return true;
			}
		}

		return false;
	};

	// Event handlers

	window.addEventListener('DOMContentLoaded', function() {
		if (body.classList.contains('full') || shower.isSlideMode()) {
			shower.go(shower.getCurrentSlideNumber());
			shower.enterSlideMode();
		}
	}, false);

	window.addEventListener('popstate', function() {
		if (shower.isListMode()) {
			shower.enterListMode();
		} else {
			shower.enterSlideMode();
		}
	}, false);

	window.addEventListener('resize', function() {
		if (shower.isSlideMode()) {
			shower._applyTransform(shower._getTransform());
		}
	}, false);

	document.addEventListener('keydown', function(e) {
		// Shortcut for alt, ctrl and meta keys
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var currentSlideNumber = shower.getCurrentSlideNumber(),
			isInnerNavCompleted = true;

		switch (e.which) {
			case 116: // F5
				e.preventDefault();

				if (shower.isListMode()) {
					var slideNumber = e.shiftKey ? currentSlideNumber : 0;

					// Warning: go must be before enterSlideMode.
					// Otherwise there is a bug in Chrome
					shower.go(slideNumber);
					shower.enterSlideMode();
					shower.showPresenterNotes(slideNumber);
				} else {
					shower.enterListMode();
				}
			break;

			case 13: // Enter
				if (shower.isListMode() && -1 !== currentSlideNumber) {
					e.preventDefault();
					shower.enterSlideMode();
					shower.showPresenterNotes(currentSlideNumber);
					shower.runInnerNavigation(currentSlideNumber);
				}
			break;

			case 27: // Esc
				if (shower.isSlideMode()) {
					e.preventDefault();
					shower.enterListMode();
				}
			break;

			case 33: // PgUp
			case 38: // Up
			case 37: // Left
			case 72: // H
			case 75: // K
				e.preventDefault();
				shower.previous();
			break;

			case 34: // PgDown
			case 40: // Down
			case 39: // Right
			case 76: // L
			case 74: // J
				e.preventDefault();
				shower.next();
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

	document.addEventListener('click', function(e) {
		var slideNumber = shower.getSlideNumber(shower._getSlideIdByEl(e.target));

		// Click on slide in List mode
		if (shower.isListMode() && shower._getSlideIdByEl(e.target)) {
			// Warning: go must be before enterSlideMode.
			// Otherwise there is a bug in Chrome
			shower.go(slideNumber);
			shower.enterSlideMode();
			shower.showPresenterNotes(slideNumber);
		}
	}, false);

	document.addEventListener('touchstart', function(e) {
		if (shower._getSlideIdByEl(e.target)) {
			if (shower.isSlideMode() && ! shower._checkInteractiveElement(e)) {
				var x = e.touches[0].pageX;

				if (x > window.innerWidth / 2) {
					shower.next();
				} else {
					shower.previous();
				}
			}

			if (shower.isListMode()) {
				shower.go(shower.getSlideNumber(shower._getSlideIdByEl(e.target)));
				shower.enterSlideMode();
			}
		}

	}, false);

	document.addEventListener('touchmove', function(e) {
		if (shower.isSlideMode()) {
			e.preventDefault();
		}
	}, false);

	return shower;

})(this, this.document);