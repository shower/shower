(function () {
	var url = window.location,
		body = document.body,
		slides = document.querySelectorAll('div.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [],
		l = slides.length,
		i;

	for (i = 0; i < l; i++) {
		slideList.push(slides[i].id);
	}

	function getTransform() {
		var denominator = Math.max(
			body.clientWidth / window.innerWidth,
			body.clientHeight / window.innerHeight
		);

		return 'scale(' + (1 / denominator) + ')';
	}

	function applyTransform(transform) {
		body.style.MozTransform = transform;
		body.style.WebkitTransform = transform;
		body.style.OTransform = transform;
		body.style.msTransform = transform;
		body.style.transform = transform;
	}

	function enterSingleSlideMode() {
		body.className = 'full';
		applyTransform(getTransform());
	}

	function enterSlideListMode() {
		body.className = 'list';
		applyTransform('none');
	}

	function getCurrentSlideNumber() {
		return slideList.indexOf(url.hash.substr(1));
	}

	function scrollToCurrentSlide() {
		var current_slide = document.getElementById(slideList[getCurrentSlideNumber()]);

		if (null != current_slide) {
			window.scrollTo(0, current_slide.offsetTop);
		}
	}

	function isSlideListMode() {
		return 'full' !== url.search.substr(1);
	}

	function normalizeSlideNumber(slide_number) {
		if (0 > slide_number) {
			return slideList.length - 1;
		} else if (slideList.length <= slide_number) {
			return 0;
		} else {
			return slide_number;
		}
	}

	function updateProgress(slide_number) {
		if (!progress) return;
		progress.style.width = (100 / (slideList.length - 1) * normalizeSlideNumber(slide_number)).toFixed(2) + '%';
	}

	function getSlideHashByNumber(slide_number) {
		return '#' + slideList[normalizeSlideNumber(slide_number)];
	}

	function goToSlide(slide_number) {
		url.hash = getSlideHashByNumber(slide_number);

		if (!isSlideListMode()) {
			updateProgress(slide_number);
		}
	}

	window.addEventListener('DOMContentLoaded', function () {
		if (!isSlideListMode()) {
			// "?full" is present without slide hash so we should display first
			// slide
			if ( -1 === getCurrentSlideNumber() ) {
				history.replaceState(null, null, url.pathname + '?full' + getSlideHashByNumber( 0 ) );
			}

			enterSingleSlideMode();
			updateProgress(getCurrentSlideNumber());
		}
	}, false);

	window.addEventListener('popstate', function (e) {
		if (isSlideListMode()) {
			enterSlideListMode();
			scrollToCurrentSlide();
		} else {
			enterSingleSlideMode();
		}
	}, false);

	window.addEventListener('resize', function (e) {
		if (!isSlideListMode()) {
			applyTransform(getTransform());
		}
	}, false);

	document.addEventListener('keydown', function (e) {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		
		var current_slide_number = getCurrentSlideNumber();

		switch (e.which) {
			case 9: // Tab = +1; Shift + Tab = -1
				if (isSlideListMode()) {
					e.preventDefault();

					current_slide_number += e.shiftKey ? -1 : 1;
					url.hash = getSlideHashByNumber(current_slide_number);
				}
			break;

			case 13: // Enter
				if (isSlideListMode()) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + '?full' + getSlideHashByNumber(current_slide_number));
					enterSingleSlideMode();

					updateProgress(current_slide_number);
				}
			break;

			case 27: // Esc
				if (!isSlideListMode()) {
					e.preventDefault();

					history.pushState(null, null, url.pathname + getSlideHashByNumber(current_slide_number));
					enterSlideListMode();
					scrollToCurrentSlide();
				}
			break;

			case 33: // PgUp
			case 38: // Up
			case 37: // Left
			case 72: // h
			case 75: // k
				e.preventDefault();

				current_slide_number--;
				goToSlide(current_slide_number);
			break;

			case 34: // PgDown
			case 40: // Down
			case 39: // Right
			case 76: // l
			case 74: // j
				e.preventDefault();

				current_slide_number++;
				goToSlide(current_slide_number);
			break;

			case 36: // Home
				e.preventDefault();

				current_slide_number = 0;
				goToSlide(current_slide_number);
			break;

			case 35: // End
				e.preventDefault();

				current_slide_number = slideList.length - 1;
				goToSlide(current_slide_number);
			break;

			case 32: // Space = +1; Shift + Space = -1
				e.preventDefault();

				current_slide_number += e.shiftKey ? -1 : 1;
				goToSlide(current_slide_number);
			break;

			default:
				// Behave as usual
		}
	}, false);

	document.addEventListener('click', function (e) {
		if (
			'SECTION' === e.target.nodeName &&
			-1 !== e.target.parentNode.parentNode.className.indexOf('slide') &&
			isSlideListMode()
		) {
			e.preventDefault();

			// NOTE: we should update hash to get things work properly
			url.hash = '#' + e.target.parentNode.parentNode.id;
			history.replaceState(null, null, url.pathname + '?full#' + e.target.parentNode.parentNode.id);
			enterSingleSlideMode();

			updateProgress(getCurrentSlideNumber());
		}
	}, false);

}());
