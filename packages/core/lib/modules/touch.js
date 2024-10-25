export default (shower) => {
	let exitFullScreen = false;
	let clickable = false;

	document.addEventListener('touchstart', (event) => {
		if (event.touches.length === 1) {
			const touch = event.touches[0];
			const x = touch.clientX;
			const { target } = touch;
			clickable = target.tabIndex !== -1;
			if (!clickable) {
				if (shower.isFullMode) {
					if (event.cancelable) event.preventDefault();
					if (window.innerWidth / 2 < x) {
						shower.next();
					} else {
						shower.prev();
					}
				}
			}
		} else if (event.touches.length === 3) {
			exitFullScreen = true;
		}
	});

	shower.container.addEventListener('touchend', (event) => {
		if (exitFullScreen) {
			event.preventDefault();
			exitFullScreen = false;
			shower.exitFullMode();
		} else if (event.touches.length === 1 && !clickable && shower.isFullMode)
			event.preventDefault();
	});
};
