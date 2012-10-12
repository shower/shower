window.shower = (function(window, document, undefined) {
	var shower = {},
		url = window.location,
		body = document.body,
		slides = document.querySelectorAll('.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [],
		timer,
		l = slides.length, i;

	for (i = 0; i < l; i++) {
		// Slide ID's are optional. In case of missing ID we set it to the
		// slide number
		if (!slides[i].id) {
			slides[i].id = i + 1;
		}

		slideList.push({
			id: slides[i].id,
			hasInnerNavigation: null !== slides[i].querySelector('.next'),
			hasTiming: (slides[i].dataset.timing && slides[i].dataset.timing.indexOf(':') !== -1)
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
			currentSlideNumber++;
			shower.go(currentSlideNumber);
			ret = currentSlideNumber + 1;
		} else {
			ret = false;
		}

		return ret;
	};

	shower.previous = function () {
		shower.go(shower.getCurrentSlideNumber() - 1);
	};

	shower.first = function() {
		shower.go(0);
	};

	shower.last = function() {
		shower.go(slideList.length - 1);
	};

	shower.enterSlideMode = function() {
		body.classList.remove('list');
		body.classList.add('full');
		shower._applyTransform(shower._getTransform());
	};

	shower.enterListMode = function() {
		body.classList.remove('full');
		body.classList.add('list');
		shower._applyTransform('none');
	};

	shower.getCurrentSlideNumber = function() {
		var i = 0,
			l = slideList.length,
			currentSlideId = url.hash.substr(1);

		for (; i < l; ++i) {
			if (currentSlideId === slideList[i].id) {
				return i;
			}
		}

		return -1;
	};

	shower.scrollToSlide = function(slideNumber) {
		var currentSlide,
			ret;

		if (-1 === slideNumber ) {
			return;
		}

		if (slideList[slideNumber]) {
			currentSlide = document.getElementById(slideList[slideNumber].id);
			window.scrollTo(0, currentSlide.offsetTop);
			ret = true;
		}

        return ret;
	};

	shower.isListMode = function() {
		return 'full' !== url.search.substr(1);
	};

	function normalizeSlideNumber(slideNumber) {
		if (0 > slideNumber) {
			return 0;
		} else if (slideList.length <= slideNumber) {
			return slideList.length - 1;
		} else {
			return slideNumber;
		}
	}

	shower.updateProgress = function (slideNumber) {
		if (null === progress) { return; }
		progress.style.width = (100 / (slideList.length - 1) * normalizeSlideNumber(slideNumber)).toFixed(2) + '%';
	};

	shower.updateCurrentAndPassedSlides = function(slideNumber) {
		var i, l = slideList.length, slide;
		slideNumber = normalizeSlideNumber(slideNumber);

		for ( i = 0; i < l; ++i ) {
			slide = document.getElementById(slideList[i].id);

			if ( i < slideNumber ) {
				slide.classList.remove('current');
				slide.classList.add('passed');
			} else if ( i > slideNumber ) {
				slide.classList.remove('passed');
				slide.classList.remove('current');
			} else {
				slide.classList.remove('passed');
				slide.classList.add('current');
			}
		}
	};

	shower.getSlideHash = function(slideNumber) {
		return '#' + slideList[normalizeSlideNumber(slideNumber)].id;
	};

	shower.go = function(slideNumber) {
		url.hash = shower.getSlideHash(slideNumber);

		if (!shower.isListMode()) {
			shower.updateProgress(slideNumber);
			shower.updateCurrentAndPassedSlides(slideNumber);
		}
	};

	shower.getContainingSlideId = function(el) {
		var node = el;

		while ('BODY' !== node.nodeName && 'HTML' !== node.nodeName) {
			if (node.classList.contains('slide')) {
				return node.id;
			} else {
				node = node.parentNode;
			}
		}

		return '';
	};

	// FIXME: Renaming needed? Or just some handlers rewriting?
	shower.dispatchSingleSlideMode = function(e) {
		// Process links
		// TODO: presentation links support
		if ('A' === e.target.nodeName) {
			e.preventDefault();

			window.open(e.target.getAttribute('href'));
			return;
		}

		var slideId = shower.getContainingSlideId(e.target);

		if ('' !== slideId && shower.isListMode()) {
			e.preventDefault();

			// NOTE: we should update hash to get things work properly
			url.hash = '#' + slideId;
			history.replaceState(null, null, url.pathname + '?full#' + slideId);
			shower.enterSlideMode();

			shower.updateProgress(shower.getCurrentSlideNumber());
			shower.updateCurrentAndPassedSlides(shower.getCurrentSlideNumber());
			shower.runSlideshowIfPresented(shower.getCurrentSlideNumber());
		}
	};

	shower.runSlideshowIfPresented = function(slideNumber) {
		slideNumber = normalizeSlideNumber(slideNumber);

		clearTimeout(timer);

		if (slideList[slideNumber].hasTiming) {
			// Compute number of milliseconds from format "X:Y", where X is
			// number of minutes, and Y is number of seconds
			var timing = document.getElementById(slideList[slideNumber].id).dataset.timing.split(':');
			timing = parseInt(timing[0], 10) * 60 * 1000 + parseInt(timing[1], 10) * 1000;

			timer = setTimeout( function () {
				shower.go(slideNumber + 1);
				shower.runSlideshowIfPresented(slideNumber + 1);
			}, timing );
		}
	};

	// Increases inner navigation by adding 'active' class to next inactive inner navigation item
	shower.increaseInnerNavigation = function(slideNumber) {
		// Shortcut for slides without inner navigation
		if (true !== slideList[slideNumber].hasInnerNavigation) { return -1; }

		var nextNodes = document.getElementById(slideList[slideNumber].id).querySelectorAll('.next:not(.active)'),
			node;

		if (0 !== nextNodes.length) {
			node = nextNodes[0];
			node.classList.add('active');
			return nextNodes.length - 1;
		} else {
			return -1;
		}
	};

	// Event handlers

	window.addEventListener('DOMContentLoaded', function () {
		if (!shower.isListMode()) {
			// "?full" is present without slide hash, so we should display first slide
			if (-1 === shower.getCurrentSlideNumber()) {
				history.replaceState(null, null, url.pathname + '?full' + shower.getSlideHash(0));
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
		if (!shower.isListMode()) {
			shower._applyTransform(shower._getTransform());
		}
	}, false);

	document.addEventListener('keydown', function (e) {
		// Shortcut for alt, shift and meta keys
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var currentSlideNumber = shower.getCurrentSlideNumber(),
			innerNavigationCompleted = true;

		switch (e.which) {
			case 116: // F5
			case 13: // Enter
				if (shower.isListMode() && -1 !== currentSlideNumber) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + '?full' + shower.getSlideHash(currentSlideNumber));
					shower.enterSlideMode();

					shower.updateProgress(currentSlideNumber);
					shower.updateCurrentAndPassedSlides(currentSlideNumber);
					shower.runSlideshowIfPresented(currentSlideNumber);
				}
			break;

			case 27: // Esc
				if (!shower.isListMode()) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + shower.getSlideHash(currentSlideNumber));
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

				if (!shower.isListMode() ) {
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
					if (!shower.isListMode()) {
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

	document.addEventListener('click', shower.dispatchSingleSlideMode, false);
	document.addEventListener('touchend', shower.dispatchSingleSlideMode, false);

	document.addEventListener('touchstart', function (e) {
		if (!shower.isListMode()) {
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
		if (!shower.isListMode()) {
			e.preventDefault();
		}
	}, false);

    return shower;

})(this, this.document);
