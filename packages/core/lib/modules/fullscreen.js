import { isInteractiveElement } from '../utils.js';

export default (shower) => {
	const toggleFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	};

	shower.container.addEventListener('keydown', (event) => {
		if (event.defaultPrevented) return;
		if (isInteractiveElement(event.target)) return;
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		if (event.key.toUpperCase() === 'F') {
			event.preventDefault();
			toggleFullScreen();
		}
	});
};
