export default shower => {
    const liveRegion = document.createElement('section');
    liveRegion.className = 'region';
    liveRegion.setAttribute('role', 'region');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-relevant', 'all');
    liveRegion.setAttribute('aria-label', 'Slide Content: Auto-updating');
    document.body.appendChild(liveRegion);

    const updateDocumentRole = () => {
        if (shower.container.isSlideMode()) {
            document.body.setAttribute('role', 'application');
        } else {
            document.body.removeAttribute('role');
        }
    };

    shower.container.events.on('modechange', updateDocumentRole);
    updateDocumentRole();

    const updateLiveRegion = () => {
        const slide = shower.player.getCurrentSlide();
        if (slide) {
            liveRegion.innerHTML = slide.getContent();
        }
    };

    shower.player.events.on('activate', updateLiveRegion);
    updateLiveRegion();
};
