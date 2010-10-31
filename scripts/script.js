$(function() {

	var slides = $( 'section.slide' );

	function fullScreen() {
		return (
			window.screenX == 0 &&
			window.screenY == 0 &&
			screen.width == window.outerWidth &&
			screen.height == window.outerHeight
		) ? true : false;
	}
	
	function turnSlide( e ) {
		if( !fullScreen() ) return;
		var current = $( document.location.hash );
		switch ( e.which ) {
			case 33 : // PgUp
			case 38 : // Up
			case 37 : // Left
				var target = current.prev( slides );
				break;
			case 34 : // PgDown
			case 40 : // Down
			case 39 : // Right
				var target = current.next( slides );
				break;
			case 32 : // Space
				var target = current[e.shiftKey ? "prev" : "next"]( slides );
				break;
			default:
				return;
		}
		e.preventDefault();
		if( !target.length ) return;
		else document.location.hash = '#' + target.attr( 'id' );
	}

	function updateView() {
		var screen = $( 'link[title=screen]' ),
			projection = $( 'link[title=projection]' ),
			fullscreen = fullScreen();
		screen.attr( 'disabled', fullscreen );
		projection.attr( 'disabled', !fullscreen );
		if( !fullscreen || $( document.location.hash ).length ) return;
		else document.location.hash = '#' + slides.first().attr( 'id' );
	}

	$( document ).
		keyup( turnSlide );

	$( window ).
		ready( updateView ).
		resize( updateView );

});