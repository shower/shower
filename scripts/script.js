var touch_x;
function getCoors(e) {
	var coors;
	if (e.touches && e.touches.length) {
		coors = e.touches[0].clientX;
	} else {
		coors = e.clientX;
	}
	return coors;
}
$dom.onready(function() {
	var slides = $dom.get('.slide');
	
	function turnSlide(e) {
		var current = $dom.get(document.location.hash)[0];
		switch (e.which) {
			case 33 : // PgUp
			case 38 : // Up
			case 37 : // Left
			var target = $dom.previous(current, slides);
				break;
			case 34 : // PgDown
			case 40 : // Down
			case 39 : // Right
			var target = $dom.next(current, slides);
				break;
			case 32 : // Space
			var target = $dom[e.shiftKey ? 'previous' : 'next'](current, slides);
				break;
			default:
				return;
		}
		if(typeof(e.preventDefault) != 'undefined') e.preventDefault();
		if(typeof(target) == 'undefined') return;
		else document.location.hash = '#' + target.id;
	}
    function touchStart(e) {
        touch_x = getCoors(e);
    }
    function touchMove(e) {
        touchend_x = getCoors(e);        
    }
    function touchEnd(e) {
        if (touchend_x - touch_x > 30) turnSlide({which: 37});
        else if (touch_x - touchend_x > 30) turnSlide({which: 39});
    }

	document.onkeyup = turnSlide;
    document.ontouchstart = touchStart;
    document.ontouchmove = touchMove;
    document.ontouchend = touchEnd;
    if (!document.location.hash) document.location.hash = '#' + slides[0].id;
});