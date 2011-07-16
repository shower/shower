(function() {

	var url = window.location,
		body = document.body,
		slides = document.querySelectorAll('div.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [];

	for(var i = 0, slidesLength = slides.length; i < slidesLength; i++) {
		slides[i].addEventListener('click', enterFull, false);
		slideList[i] = slides[i].id;
	}

	function resizeFull(p) {
		if(typeof p == 'boolean' && !p) {
			var transform = 'none';
		} else {
			var sx = body.clientWidth / window.innerWidth,
				sy = body.clientHeight / window.innerHeight,
				transform = 'scale(' + (1/Math.max(sx, sy)) + ')';
		}
		body.style.MozTransform = transform;
		body.style.WebkitTransform = transform;
		body.style.OTransform = transform;
		body.style.msTransform = transform;
		body.style.transform = transform;
	}

	function turnSlide(e) {
		var current = slideList.indexOf(url.hash.substr(1));
		if(e) {
			if(e.type == 'keydown') {
				switch(e.which) {
					case 33 : // PgUp
					case 38 : // Up
					case 37 : // Left
					case 75 : // k
						current--;
						e.preventDefault();
						break;
					case 34 : // PgDown
					case 40 : // Down
					case 39 : // Right
					case 74 : // j
						current++;
						e.preventDefault();
						break;
					case 36 : // Home
						current = 0;
						e.preventDefault();
						break;
					case 35 : // End
						current = slideList.length-1;
						e.preventDefault();
						break;
					case 32 : // Space
						current += e.shiftKey ? -1 : 1;
						e.preventDefault();
						break;
				}
			}
			if(e.type == 'click') {
				current = slideList.indexOf(e.target.parentNode.id);
			}
		} else {
			current = (current+1) ? current : 0;
		}
		target = slideList[current];
		if(target) url.hash = target;
	}

	function enterFull(e) {
		body.className = 'full';
		resizeFull(true);
		turnSlide(e);
		if(!isFull()) history.pushState(null, null, url.pathname + '?full' + url.hash);
		window.addEventListener('resize', resizeFull, false);
		document.addEventListener('keyup', exitFullEsc, false);
	}

	function exitFull() {
		body.className = 'list';
		resizeFull(false);
		history.pushState(null, null, url.href.replace('?full', ''));
		window.removeEventListener('resize', resizeFull, false);
		document.removeEventListener('keyup', exitFullEsc, false);
	}

	function exitFullEsc(e) {
		if(e.which != 27) return;
		exitFull();
	}

	function isFull() {
		return url.search.substr(1) == 'full';
	}

	window.addEventListener('DOMContentLoaded', function() {
		if(isFull()) enterFull();
	}, false);
	document.addEventListener('keydown', turnSlide, false);

})();