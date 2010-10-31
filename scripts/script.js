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
		e.preventDefault();
		if(typeof(target) == 'undefined') return;
		else document.location.hash = '#' + target.id;
	}

	document.onkeyup = turnSlide;
    document.location.hash = '#' + slides[0].id;
});