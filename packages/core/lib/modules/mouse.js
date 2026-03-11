export default (shower) => {
	const { mouseHiddenClass, mouseInactivityTimeout } = shower.options;

	let hideMouseTimeoutId = null;

	const cleanUp = () => {
		shower.container.classList.remove(mouseHiddenClass);
		clearTimeout(hideMouseTimeoutId);
		hideMouseTimeoutId = null;
	};

	const hideMouseIfInactive = () => {
		if (hideMouseTimeoutId !== null) {
			cleanUp();
		}

		hideMouseTimeoutId = setTimeout(() => {
			shower.container.classList.add(mouseHiddenClass);
		}, mouseInactivityTimeout);
	};

	const initHideMouseIfInactiveModule = () => {
		shower.container.addEventListener('mousemove', hideMouseIfInactive);
	};

	const destroyHideMouseIfInactiveModule = () => {
		shower.container.removeEventListener('mousemove', hideMouseIfInactive);
		cleanUp();
	};

	const handleModeChange = () => {
		if (shower.isFullMode) {
			initHideMouseIfInactiveModule();
		} else {
			destroyHideMouseIfInactiveModule();
		}
	};

	shower.addEventListener('start', handleModeChange);
	shower.addEventListener('modechange', handleModeChange);
};
