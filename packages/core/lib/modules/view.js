export default (shower) => {
    const { container } = shower;
    const { fullModeClass, listModeClass } = shower.options;

    if (container.classList.contains(fullModeClass)) {
        shower.enterFullMode();
    } else {
        container.classList.add(listModeClass);
    }

    const updateScale = () => {
        const firstSlide = shower.slides[0];
        if (!firstSlide) return;

        const { innerWidth, innerHeight } = window;
        const { offsetWidth, offsetHeight } = firstSlide.element;

        const listScale = 1 / (offsetWidth / innerWidth);
        const fullScale = 1 / Math.max(offsetWidth / innerWidth, offsetHeight / innerHeight);

        container.style.setProperty('--shower-list-scale', listScale);
        container.style.setProperty('--shower-full-scale', fullScale);
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
