export default (shower) => {
    const { container } = shower;
    const { fullModeClass, listModeClass } = shower.options;

    if (container.classList.contains(fullModeClass)) {
        shower.enterFullMode();
    } else {
        container.classList.add(listModeClass);
    }

    const getScale = () => {
        const maxRatio = Math.max(
            container.offsetWidth / window.innerWidth,
            container.offsetHeight / window.innerHeight,
        );

        return `scale(${1 / maxRatio})`;
    };

    const updateScale = () => {
        container.style.transform = shower.isFullMode ? getScale() : '';
    };

    const updateModeView = () => {
        if (shower.isFullMode) {
            container.classList.remove(listModeClass);
            container.classList.add(fullModeClass);
        } else {
            container.classList.remove(fullModeClass);
            container.classList.add(listModeClass);
        }

        updateScale();

        if (shower.isFullMode) return;

        const slide = shower.activeSlide;
        if (slide) {
            slide.element.scrollIntoView({ block: 'center' });
        }
    };

    shower.addEventListener('start', updateModeView);
    shower.addEventListener('modechange', updateModeView);
    shower.addEventListener('slidechange', () => {
        if (shower.isFullMode) return;

        const slide = shower.activeSlide;
        slide.element.scrollIntoView({ block: 'nearest' });
    });

    window.addEventListener('resize', updateScale);
};
