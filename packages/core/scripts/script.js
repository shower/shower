(function() {

	var url = document.location,
		body = document.body;
		slides = document.querySelectorAll('section.slide'),
		slideList = [], hashList = {},
		progress = document.querySelector('div.progress div'),
		fullscreen = false;

	for(var i = 0, slidesLength = slides.length; i < slidesLength; i++) {
		var id = slides[i].id;
		slideList[i] = '#' + id;
		hashList['#' + id] = i;
		slides[i].addEventListener('click', function(){
			enterSingle();
			turnSlide(hashList['#' + this.id]);
		}, false);
	}

	function resizeBody(p) {
		if(typeof p == 'boolean' && p) {
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
		var current = hashList[url.hash],
			target;
		if(e.type == 'keyup') { // Key-Based
			switch(e.which) {
				case 33 : // PgUp
				case 38 : // Up
				case 37 : // Left
					current--;
					break;
				case 34 : // PgDown
				case 40 : // Down
				case 39 : // Right
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
			}
			e.preventDefault();
		} else {
			current = e || 0;
		}
		target = slideList[current];
		if(target) url.hash = target;
		updateProgress();
	}

	function enterSingle() {
		body.className = 'single';
		resizeBody();
		updateProgress();
		window.addEventListener('resize', resizeBody, false);
		document.addEventListener('keyup', turnSlide, false);
		document.addEventListener('keyup', exitSingleEsc, false);
	}

	function exitSingle() {
		body.className = 'multiple';
		resizeBody(true);
		window.removeEventListener('resize', resizeBody, false);
		window.removeEventListener('keyup', turnSlide, false);
		document.removeEventListener('keyup', exitSingleEsc, false);
	}

	function exitSingleEsc(e) {
		if(e.which != 27) return;
		exitSingle();
		url.hash = '';
	}

	function checkHash() {
		if(typeof hashList[url.hash] != 'undefined') {
			enterSingle();
		}
	}

	function updateProgress() {
		if(!progress) return;
		progress.style.width = (100/(slideList.length-1) * hashList[url.hash]).toFixed(2) + '%';
	}

	window.addEventListener('DOMContentLoaded', checkHash, false);

})();