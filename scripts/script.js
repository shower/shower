window.shower = (function () {
	var _ = {},
		url = window.location,
		body = document.body,
		slides = document.querySelectorAll('div.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [],
		l = slides.length, i;

	for (i = 0; i < l; i++) {
		slideList.push({
			id: slides[i].id,
			hasInnerNavigation: null !== slides[i].querySelector('.inner')
		});
	}

	function getTransform() {
		var denominator = Math.max(
			body.clientWidth / window.innerWidth,
			body.clientHeight / window.innerHeight
		);

		return 'scale(' + (1 / denominator) + ')';
	}

	function applyTransform(transform) {
		body.style.WebkitTransform = transform;
		body.style.MozTransform = transform;
		body.style.msTransform = transform;
		body.style.OTransform = transform;
		body.style.transform = transform;
	}

	_.next = function () {
		var currentSlideNumber = _.getCurrentSlideNumber();

		// Only go to next slide if current slide have no inner
		// navigation or inner navigation is fully shown
		// NOTE: But first of all check if there is no current slide
		if (
			-1 === currentSlideNumber ||
			!slideList[currentSlideNumber].hasInnerNavigation ||
			-1 === increaseInnerNavigation(currentSlideNumber)
		) {
			currentSlideNumber++;
			_.go(currentSlideNumber);
		}
	}
	_.previous = function () {
		_.go(_.getCurrentSlideNumber() - 1);
	}
	_.first = function() {
		_.go(0)
	}
	_.last = function() {
		_.go(slideList.length - 1);
	}

	_.enterSlideMode = function() {
		body.className = 'full';
		applyTransform(getTransform());
	}

	_.enterListMode = function() {
		body.className = 'list';
		applyTransform('none');
	}

	_.getCurrentSlideNumber = function() {
		var i, l = slideList.length,
			currentSlideId = url.hash.substr(1);

		for (i = 0; i < l; ++i) {
			if (currentSlideId === slideList[i].id) {
				return i;
			}
		}

		return -1;
	}

	function scrollToSlide(slideNumber) {
		if (-1 === slideNumber ) { return; }

		var currentSlide = document.getElementById(slideList[slideNumber].id);

		if (null != currentSlide) {
			window.scrollTo(0, currentSlide.offsetTop);
		}
	}

	_.isListMode = function() {
		return 'full' !== url.search.substr(1);
	}

	function normalizeSlideNumber(slideNumber) {
		if (0 > slideNumber) {
			return slideList.length - 1;
		} else if (slideList.length <= slideNumber) {
			return 0;
		} else {
			return slideNumber;
		}
	}

	_.updateProgress = function(slideNumber) {
		if (null === progress) { return; }
		progress.style.width = (100 / (slideList.length - 1) * normalizeSlideNumber(slideNumber)).toFixed(2) + '%';
	}

	_.getSlideHash = function(slideNumber) {
		return '#' + slideList[normalizeSlideNumber(slideNumber)].id;
	}

	_.go = function(slideNumber) {
		url.hash = _.getSlideHash(slideNumber);

		if (!_.isListMode()) {
			_.updateProgress(slideNumber);
		}

		if (typeof _.onchange == 'function')
			_.onchange(slideNumber);
	}

	function getContainingSlideId(el) {
		var node = el;
		while ('BODY' !== node.nodeName && 'HTML' !== node.nodeName) {
			if (node.classList.contains('slide')) {
				return node.id;
			} else {
				node = node.parentNode;
			}
		}

		return '';
	}

	function dispatchSingleSlideMode(e) {
		var slideId = getContainingSlideId(e.target);

		if ('' !== slideId && _.isListMode()) {
			e.preventDefault();

			// NOTE: we should update hash to get things work properly
			url.hash = '#' + slideId;
			history.replaceState(null, null, url.pathname + '?full#' + slideId);
			_.enterSlideMode();

			_.updateProgress(_.getCurrentSlideNumber());
		}
	}

	// Increases inner navigation by adding 'active' class to next inactive inner navigation item
	function increaseInnerNavigation(slideNumber) {
		// Shortcut for slides without inner navigation
		if (true !== slideList[slideNumber].hasInnerNavigation) { return -1; }

		var activeNodes = document.querySelectorAll(_.getSlideHash(slideNumber) + ' .active'),
			// NOTE: we assume there is no other elements in inner navigation
			node = activeNodes[activeNodes.length - 1].nextElementSibling;

		if (null !== node) {
			node.classList.add('active');
			return activeNodes.length + 1;
		} else {
			return -1;
		}
	}

	// Event handlers

	window.addEventListener('DOMContentLoaded', function () {
		if (!_.isListMode()) {
			// "?full" is present without slide hash, so we should display first slide
			if (-1 === _.getCurrentSlideNumber()) {
				history.replaceState(null, null, url.pathname + '?full' + _.getSlideHash(0));
			}

			_.enterSlideMode();
			_.updateProgress(_.getCurrentSlideNumber());
		}
	}, false);

	window.addEventListener('popstate', function (e) {
		if (_.isListMode()) {
			_.enterListMode();
			scrollToSlide(_.getCurrentSlideNumber());
		} else {
			_.enterSlideMode();
		}
	}, false);

	window.addEventListener('resize', function (e) {
		if (!_.isListMode()) {
			applyTransform(getTransform());
		}
	}, false);

	document.addEventListener('keydown', function (e) {
		// Shortcut for alt, shift and meta keys
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }
		var currentSlideNumber = _.getCurrentSlideNumber();

		switch (e.which) {
			case 116: // F5
			case 13: // Enter
				if (_.isListMode() && -1 !== currentSlideNumber) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + '?full' + _.getSlideHash(currentSlideNumber));
					_.enterSlideMode();

					_.updateProgress(currentSlideNumber);
				}
			break;

			case 27: // Esc
				if (!_.isListMode()) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + _.getSlideHash(currentSlideNumber));
					_.enterListMode();
					scrollToSlide(currentSlideNumber);
				}
			break;

			case 33: // PgUp
			case 38: // Up
			case 37: // Left
			case 72: // h
			case 75: // k
				e.preventDefault();
				_.previous();
			break;

			case 34: // PgDown
			case 40: // Down
			case 39: // Right
			case 76: // l
			case 74: // j
				e.preventDefault();

				_.next();
			break;

			case 36: // Home
				e.preventDefault();
				_.first();
			break;

			case 35: // End
				e.preventDefault();
				_.last();
			break;

			case 9: // Tab = +1; Shift + Tab = -1
			case 32: // Space = +1; Shift + Space = -1
				e.preventDefault();

				_[e.shiftKey ? 'previous' : 'next']();
			break;

			default:
				// Behave as usual
		}
	}, false);

	document.addEventListener('click', dispatchSingleSlideMode, false);
	document.addEventListener('touchend', dispatchSingleSlideMode, false);

	document.addEventListener('touchstart', function (e) {
		if (!_.isListMode()) {
			var currentSlideNumber = _.getCurrentSlideNumber(),
				x = e.touches[0].pageX;
			if (x > window.innerWidth / 2) {
				currentSlideNumber++;
			} else {
				currentSlideNumber--;
			}

			_.go(currentSlideNumber);
		}
	}, false);

	document.addEventListener('touchmove', function (e) {
		if (!_.isListMode()) {
			e.preventDefault();
		}
	}, false);

	return _;
}());
