/**
 * Shower HTML presentation engine: github.com/shower/shower
 * @copyright 2010–2013 Vadim Makeev, pepelsbey.net
 * @license MIT license: github.com/shower/shower/wiki/MIT-License
 */
window.shower = window.shower || (function(window, document, undefined) {
	var shower = {},
		url = window.location,
		body = document.body,
		slides = [],
		progress = [],
		timer,
		isHistoryApiSupported = !!(window.history && window.history.pushState);

	/**
	 * Slide constructor
	 *
	 * @param {Object} opts
	 *	  @param {String} opts.id html id attribute or automaticaly assigned order number
	 *	  @param {Number} opts.number slide number
	 *	  @param {Boolean} opts.hasInnerNavigation
	 *	  @param {Number} [opts.timing]
	 *	  @param {Number} [opts.innerLength]
	 *	  @param {Number} [opts.innerComplete = 0]
	 * @constructor
	 */
	function Slide(opts) {
		for (var prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				this[prop] = opts[prop];
			}
		}
	}

	Slide.prototype = {
		/**
		 * Get slide number.
		 * @returns {Number}
		 */
		getSlideNumber : function() {
			return this.number;
		},

		isLast : function() {
			return shower.slideList.length === this.number + 1
		},

		/**
		 * Check if inner navigation is finished
		 * @returns {boolean}
		 */
		isFinished : function() {
			return this.innerComplete >= this.innerLength;
		},

		/**
		 * Start inner navigation by timer or just switch slide after timer.
		 * time sets in HTML: .slide[data-timing=MM:SS]
		 * @returns {Object} Current slide
		 */
		process : function(shower) {
			if (this.timing) {
				this.initTimer(shower);
				return this;
			}

			this.next(shower);
			return this;
		},

		/**
		 * Init timer for inner navigation or for just turn to next slide
		 * @param shower
		 * @returns {Object|Boolean} Current slide
		 */
		initTimer : function(shower) {
			var slide = this;

			if ( ! slide.timing) {
				return false;
			}

			slide.stopTimer();

			if (slide.isFinished()) {
				timer = setInterval(function() {
						slide.stopTimer();
						shower.next();
					},
					slide.timing * (slide.innerLength || 1));
			} else {
				timer = setInterval(function() {
						if (slide.isFinished()) {
							slide.stopTimer();
								shower.next();
						} else {
							slide.next(shower);
						}
					},
					slide.timing);
			}

			return this;
		},

		/**
		 * Stop timer
		 */
		stopTimer : function() {
			if (timer) {
				clearInterval(timer);
				timer = false;
			}

			return this;
		},

		/**
		 * Previous step of inner navigation or if current step is step 0 then go to previous slide.
		 * @returns {Object|Boolean} Current slide
		 */
		prev : function(shower) {
			var prevSteps,
				slide = this;

			if ( ! slide.hasInnerNavigation || slide.isFinished() || slide.innerComplete === 0) {
				shower.prev();
				return false;
			}

			prevSteps = document.getElementById(slide.id).querySelectorAll('.next.active');

			if ( ! prevSteps || prevSteps.length < 1) {
				return false;
			}

			if (slide.innerComplete > 0) {
				slide.innerComplete--;
				prevSteps[prevSteps.length - 1].classList.remove('active');
			} else {
				shower.prev();
			}

			return this;
		},

		/**
		 * Next step of inner navigation or if current step is last then go to next slide.
		 * @returns {Object|Boolean} Current slide
		 */
		next : function(shower) {
			var nextSteps,
				slide = this;

			if ( ! slide.hasInnerNavigation || slide.isFinished()) {
				shower.next();
				return false;
			}

			if ( ! slide.isFinished()) {
				nextSteps = document.getElementById(slide.id).querySelectorAll('.next:not(.active)');
				nextSteps[0].classList.add('active');

				slide.innerComplete++;
			}

			return this;
		}
	};

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

	shower.slideList = [];

	/**
	 * Shower initialization
	 * @param {String} [slideSelector]
	 * @param {String} [progressSelector]
	 * @returns {Object} shower
	 */
	shower.init = function(slideSelector, progressSelector) {
		var timing;

		slideSelector = slideSelector || '.slide';
		progressSelector = progressSelector || 'div.progress div';

		slides = document.querySelectorAll(slideSelector);
		progress = document.querySelector(progressSelector);

		for (var i = 0; i < slides.length; i++) {
			// Slide IDs are optional.
			// In case of missing ID we set it to the slide number
			if ( ! slides[i].id) {
				slides[i].id = i + 1;
			}

			timing = shower._getData(slides[i], 'timing');

			// Parsing timing in [S] or [M:S] format
			// and returning it in milliseconds
			if (timing && /^(\d{1,2}:)?\d{1,3}$/.test(timing)) {
				if (timing.indexOf(':') !== -1) {
					timing = timing.split(':');
					timing = (parseInt(timing[0], 10) * 60 + parseInt(timing[1], 10)) * 1000;
				} else {
					timing = parseInt(timing, 10) * 1000;
				}
				if (timing === 0) {
					timing = false;
				}
			} else {
				timing = false;
			}

			shower.slideList.push(new Slide({
				id : slides[i].id,
				number : i,
				hasInnerNavigation : null !== slides[i].querySelector('.next'),
				timing : timing,
				innerLength : slides[i].querySelectorAll('.next').length,
				innerComplete : 0
			}));
		}

		return shower;
	};

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
		[
			'WebkitTransform',
			'MozTransform',
			'msTransform',
			'OTransform',
			'transform'
		].forEach(function(prop) {
				body.style[prop] = transform;
		});

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

		if (slideNumber >= shower.slideList.length) {
			slideNumber = shower.slideList.length - 1;
		}

		return slideNumber;
	};

	/**
	* Get slide id from HTML element.
	* @private
	* @param {Node} el
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
	* @TODO: add support for textarea/input/etc.
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
	 * @param {String} slideId
	 * @returns {Number}
	 */
	shower.getSlideNumber = function(slideId) {
		var i = shower.slideList.length - 1,
			slideNumber;

		if (slideId === '') {
			slideNumber = 0;
		}

		// As fast as you can ;-)
		// http://jsperf.com/for-vs-foreach/46
		for (; i >= 0; --i) {
			if (slideId === shower.slideList[i].id) {
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
	* @returns {Number|Boolean}
	*/
	shower.go = function(slideNumber, callback) {
		var slide;

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		if ( ! shower.slideList[slideNumber]) {
			return false;
		}

		// Also triggers popstate and invoke shower.enter__Mode()
		url.hash = shower.getSlideHash(slideNumber);

		shower.updateProgress(slideNumber);
		shower.updateActiveAndVisitedSlides(slideNumber);

		if (shower.isSlideMode()) {
			shower.showPresenterNotes(slideNumber);
			slide = shower.slideList[slideNumber];
			if (slide.timing) {
				slide.initTimer(shower);
			}
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return slideNumber;
	};

	/**
	* Show next slide or show next Inner navigation item.
	* Returns false on a last slide, otherwise returns shower.
	* @param {Function} [callback] runs only if shower.next() is successfully completed.
	* @returns {Boolean}
	*/
	shower.next = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			nextSlide = shower.slideList[currentSlideNumber + 1];

		// If don't exist next slide
		if (! nextSlide) {
			return false;
		}

		shower.go(currentSlideNumber + 1);

		if (typeof(callback) === 'function') {
			callback();
		}

		return this;
	};

	/**
	 *
	 * @param {Function} [callback]
	 */
	shower._turnNextSlide = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			slide = shower.slideList[currentSlideNumber];


		if (shower.isSlideMode()) {
			slide.stopTimer();
			slide.next(shower);
		} else {
			shower.go(currentSlideNumber + 1);
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return;
	};

	/**
	* Show previous slide. Returns false on a first slide, otherwise returns shown slide number.
	* @param {Function} [callback] runs only if shower.previous() is successfully completed.
	* @returns {Boolean}
	*/
	shower.prev = shower.previous = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber();

		// Slides starts from 0
		if (currentSlideNumber < 1) {
			return false;
		}

		shower.go(currentSlideNumber - 1);

		if (typeof(callback) === 'function') {
			callback();
		}

		return true;
	};

	/**
	 * Show previous slide. Returns false on a first slide, otherwise returns shown slide number.
	 * @param {Function} [callback] runs only if shower.previous() is successfully completed.
	 * @returns {Boolean}
	 */
	shower._turnPreviousSlide = function(callback) {
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			slide = shower.slideList[currentSlideNumber];

		slide.stopTimer();

		if (shower.isSlideMode()) {
			slide.prev(shower);
		} else {
			shower.go(currentSlideNumber - 1);
		}

		if (typeof(callback) === 'function') {
			callback();
		}

		return true;
	};

	/**
	* Show first slide.
	* @param {Function} [callback]
	*/
	shower.first = function(callback) {
		var slide = shower.slideList[shower.getCurrentSlideNumber()];

		slide.timing && slide.stopTimer();
		shower.go(0);

		if (typeof(callback) === 'function') {
			callback();
		}
	};

	/**
	* Show last slide.
	* @param {Function} [callback]
	*/
	shower.last = function(callback) {
		var slide = shower.slideList[shower.getCurrentSlideNumber()];

		slide.timing && slide.stopTimer();
		shower.go(shower.slideList.length - 1);

		if (typeof(callback) === 'function') {
			callback();
		}
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
		var currentSlideNumber;

		// Anyway: change body class (@TODO: refactoring)
		body.classList.remove('full');
		body.classList.add('list');

		shower.clearPresenterNotes();

		if (shower.isListMode()) {
			return false;
		}

		currentSlideNumber = shower.getCurrentSlideNumber();

		shower.slideList[currentSlideNumber].stopTimer();

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
		var i = shower.slideList.length - 1,
			currentSlideId = url.hash.substr(1);

		// As fast as you can ;-)
		// http://jsperf.com/for-vs-foreach/46
		for (; i >= 0; --i) {
			if (currentSlideId === shower.slideList[i].id) {
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

		if (shower.slideList[slideNumber]) {
			currentSlide = document.getElementById(shower.slideList[slideNumber].id);
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

		progress.style.width = (100 / (shower.slideList.length - 1) * shower._normalizeSlideNumber(slideNumber)).toFixed(2) + '%';

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
			l = shower.slideList.length;

		slideNumber = shower._normalizeSlideNumber(slideNumber);

		if ( ! shower._isNumber(slideNumber)) {
			throw new Error('Gimme slide number as Number, baby!');
		}

		for (i = 0; i < l; ++i) {
			slide = document.getElementById(shower.slideList[i].id);

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
	* Clear presenter notes in console (only for Slide Mode).
	*/
	shower.clearPresenterNotes = function() {
		if (shower.isSlideMode() && window.console && window.console.clear) {
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

			var slideId = shower.slideList[slideNumber].id,
				nextSlideId = shower.slideList[slideNumber + 1] ? shower.slideList[slideNumber + 1].id : null,
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

		return '#' + shower.slideList[slideNumber].id;
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
		var currentSlideNumber = shower.getCurrentSlideNumber(),
			slide = shower.slideList[ currentSlideNumber !== -1 ? currentSlideNumber : 0 ],
			slideNumber;

		switch (e.which) {
			case 80: // P Alt Cmd
				if (shower.isListMode() && e.altKey && e.metaKey) {
					e.preventDefault();

					slideNumber = slide.number;

					shower.go(slideNumber);
					shower.enterSlideMode();
					shower.showPresenterNotes(slideNumber);

					slide.timing && slide.initTimer(shower);
				}
			break;

			case 116: // F5 (Shift)
				e.preventDefault();
				if (shower.isListMode()) {
					slideNumber = e.shiftKey ? slide.number : 0;

					shower.go(slideNumber);
					shower.enterSlideMode();
					shower.showPresenterNotes(slideNumber);

					slide.timing && slide.initTimer(shower);
				} else {
					shower.enterListMode();
				}
			break;

			case 13: // Enter
				if (shower.isListMode() && -1 !== currentSlideNumber) {
					e.preventDefault();

					shower.enterSlideMode();
					shower.showPresenterNotes(currentSlideNumber);

					slide.timing && slide.initTimer(shower);
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
				if (e.altKey || e.ctrlKey || e.metaKey) { return; }
				e.preventDefault();
				shower._turnPreviousSlide();
			break;

			case 34: // PgDown
			case 40: // Down
			case 39: // Right
			case 76: // L
			case 74: // J
				if (e.altKey || e.ctrlKey || e.metaKey) { return; }
				e.preventDefault();
				shower._turnNextSlide();
			break;

			case 36: // Home
				e.preventDefault();
				shower.first();
			break;

			case 35: // End
				e.preventDefault();
				shower.last();
			break;

			case 9: // Tab (Shift)
			case 32: // Space (Shift)
				e.preventDefault();
				shower[e.shiftKey ? '_turnPreviousSlide' : '_turnNextSlide']();
			break;

			default:
				// Behave as usual
		}
	}, false);

	shower.init();

	document.addEventListener('click', function(e) {
		var slideNumber = shower.getSlideNumber(shower._getSlideIdByEl(e.target)),
			slide;

		// Click on slide in List mode
		if (shower.isListMode() && shower._getSlideIdByEl(e.target)) {
			// Warning: go must be before enterSlideMode.
			// Otherwise there is a bug in Chrome
			shower.go(slideNumber);
			shower.enterSlideMode();
			shower.showPresenterNotes(slideNumber);

			slide = shower.slideList[slideNumber];
			if (slide.timing) {
				slide.initTimer(shower);
			}
		}
	}, false);

	document.addEventListener('touchstart', function(e) {
		var slideNumber = shower.getSlideNumber(shower._getSlideIdByEl(e.target)),
			slide,
			x;

		if (shower._getSlideIdByEl(e.target)) {
			if (shower.isSlideMode() && ! shower._checkInteractiveElement(e)) {
				x = e.touches[0].pageX;

				if (x > window.innerWidth / 2) {
                    shower._turnNextSlide();
				} else {
                    shower._turnPreviousSlide();
				}
			}

			if (shower.isListMode()) {
				// Warning: go must be before enterSlideMode.
				// Otherwise there is a bug in Chrome
				shower.go(shower.getSlideNumber(shower._getSlideIdByEl(e.target)));
				shower.enterSlideMode();
				shower.showPresenterNotes(slideNumber);

				slide = shower.slideList[slideNumber];
				if (slide.timing) {
					slide.initTimer(shower);
				}
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
