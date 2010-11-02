var url = document.location,
	domSlides = document.querySelectorAll('section.slide'),
	slides = [], backhash = {},
	linkScreen = document.querySelector('link[title=screen]'),
	linkProjection = document.querySelector('link[title=projection]'),
	fullscreen = false;

for(var i = 0, len = domSlides.length; i < len; i++) {
	var id = domSlides[i].id;
	slides[i] = '#' + id;
	backhash['#' + id] = i;
}

function enterFull() {
	fullscreen = true;
	updateView();
}

function exitFull(e) {
	if(e.which == 27) {
		fullscreen = false;
		updateView();
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

document.addEventListener('keyup', turnSlide, false);
domSlides[0].addEventListener('click', enterFull, false);
document.addEventListener('keyup', exitFull, false);