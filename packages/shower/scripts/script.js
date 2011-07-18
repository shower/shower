(function() {

	var url = window.location,
		body = document.body,
		slides = document.querySelectorAll('div.slide'),
		progress = document.querySelector('div.progress div'),
		slideList = [];

	for(var i = 0, slidesLength = slides.length; i < slidesLength; i++) {
		slides[i].firstChild.addEventListener('click', enterFull, false);
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
		var current = slideList.indexOf(url.hash.substr(1)), target;
		if(e) {
			if(e.type == 'keydown') {
				var prevent = true;
				switch(e.which) {
					case 33 : // PgUp
					case 38 : // Up
					case 37 : // Left
					case 75 : // k
						current--;
						break;
					case 34 : // PgDown
					case 40 : // Down
					case 39 : // Right
					case 74 : // j
						current++;
						break;
					case 36 : // Home
						current = 0;
						break;
					case 35 : // End
						current = slideList.length-1;
						break;
					case 32 : // Space
						current += e.shiftKey ? -1 : 1;
						break;
					default:
						prevent = false;
				}
				if(prevent) e.preventDefault();
			}
			if(e.type == 'click') {
				current = slideList.indexOf(e.target.parentNode.parentNode.id);
			}
		} else {
			current = (current+1) ? current : 0;
		}
		target = slideList[current];
		if(target) url.hash = target;
		updateProgress();
	}

	function enterFull(e) {
		body.className = 'full';
		resizeFull(true);
		turnSlide(e);
		updateProgress();
		if(!isFull()) history.pushState(null, null, url.pathname + '?full' + url.hash);
		window.addEventListener('resize', resizeFull, false);
		document.addEventListener('keyup', exitFullKey, false);
		document.removeEventListener('keydown', enterFullKey, false);
	}
	
	function enterFullKey(e) {
		if(e.which != 13) return;
		enterFull();
	}

	function exitFull() {
		body.className = 'list';
		resizeFull(false);
		var hash = url.hash;
		history.pushState(null, null, url.pathname.replace('?full', ''));		
		url.hash = hash;
		window.removeEventListener('resize', resizeFull, false);
		document.removeEventListener('keyup', exitFullKey, false);
		document.addEventListener('keydown', enterFullKey, false);
	}

	function exitFullKey(e) {
		if(e.which != 27) return;
		exitFull();
	}

	function isFull() {
		return url.search.substr(1) == 'full';
	}

	function updateProgress() {
		if(!progress) return;
		progress.style.width = (100/(slideList.length-1) * slideList.indexOf(url.hash.substr(1))).toFixed(2) + '%';
	}

	window.addEventListener('DOMContentLoaded', function() {
		if(isFull()) enterFull();
	}, false);
	window.addEventListener("popstate", function() {
		var current_slide_number = slideList.indexOf(url.hash.substr(1));
		if (-1 === current_slide_number) { exitFull(); }
	}, false);

	document.addEventListener('keydown', turnSlide, false);
	document.addEventListener('keydown', enterFullKey, false);

})();
