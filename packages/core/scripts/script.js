var domSlides = document.querySelectorAll('section.slide'),
	url = document.location,
	slides = [],
	backhash = {},
	linkScreen = document.querySelector('link[title=screen]'),
	linkProjection = document.querySelector('link[title=projection]');

for(var i = 0, len = domSlides.length; i < len; i++) {
	var id = domSlides[i].id;
	slides[i] = '#' + id;
	backhash['#' + id] = i;
}

function fullScreen() {
	return window.screenX == 0 &&
		window.screenY == 0 &&
		screen.width == window.outerWidth &&
		screen.height == window.outerHeight;
}

function turnSlide(e) {
	if(!fullScreen()) return;
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
	var fullscreen = fullScreen();
	linkScreen.disabled = fullscreen;
	linkProjection.disabled = !fullscreen;
	if(fullscreen && !backhash[url.hash]) url.hash = slides[0];
}

window.addEventListener('DOMContentLoaded', updateView, false);
window.addEventListener('resize', updateView, false);
document.addEventListener('keyup', turnSlide, false);