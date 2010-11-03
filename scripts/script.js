var url = document.location,
	domSlides = document.querySelectorAll('section.slide'),
	slides = [], backhash = {},
	linkScreen = document.querySelector('link[title=screen]'),
	linkProjection = document.querySelector('link[title=projection]'),
	iframes = window.frames,
	fullscreen = false;

for(var i = 0, iLength = domSlides.length; i < iLength; i++) {
	var id = domSlides[i].id;
	slides[i] = '#' + id;
	backhash['#' + id] = i;
}

for( var j = 0, jLength = iframes.length; j < jLength; j++ ) {
	iframes[j].onfocus = function() {
		window.top.focus();
	}
}

function enterFull() {
	fullscreen = true;
	updateView();
}

function exitFull() {
	fullscreen = false;
	updateView();
}

function toggleFull() {
	if(	window.fullScreen || // Firefox
		document.webkitFullScreen || // Webkit
		screen.width == window.outerWidth && screen.height == window.outerHeight ) {
		enterFull();
	} else {
		exitFull();
	}
}

function turnSlide(e) {
	if(!fullscreen) return;
	var current = backhash[url.hash],
		target,
		command;
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
		case 32 : // Space
			current += e.shiftKey ? -1 : 1;
			break;
		default:
			return;
	}
	target = slides[current];
	e.preventDefault();
	if(target) url.hash = target;
}

function updateView() {
	linkScreen.disabled = fullscreen;
	linkProjection.disabled = !fullscreen;
	if(fullscreen && !backhash[url.hash]) url.hash = slides[0];
}

domSlides[0].addEventListener('click', enterFull, false);

window.addEventListener('DOMContentLoaded', toggleFull, false);
window.addEventListener('resize', toggleFull, false);

document.addEventListener('keyup', turnSlide, false);
document.addEventListener('keyup', function(e) {
	if(e.which == 27) exitFull();
}, false);