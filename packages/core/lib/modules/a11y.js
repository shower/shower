const createLiveRegion = () => {
    const liveRegion = document.createElement('section');
    liveRegion.className = 'region';
    liveRegion.setAttribute('role', 'region');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-relevant', 'all');
    liveRegion.setAttribute('aria-label', 'Slide Content: Auto-updating');
    return liveRegion;
};

export default (shower) => {
    const { container } = shower;
    const liveRegion = createLiveRegion();
    container.appendChild(liveRegion);

    const updateDocumentRole = () => {
        if (shower.isFullMode) {
            container.setAttribute('role', 'application');
        } else {
            container.removeAttribute('role');
        }
    };

    const updateLiveRegion = () => {
        const slide = shower.activeSlide;
        if (slide) {
            liveRegion.innerHTML = slide.element.innerHTML;
        }
    };

    shower.addEventListener('start', () => {
        updateDocumentRole();
        updateLiveRegion();
    });

    shower.addEventListener('modechange', updateDocumentRole);
    shower.addEventListener('slidechange', updateLiveRegion);
};
