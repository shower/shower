export default (shower) => {
    const { container } = shower;
    const { fullModeClass, listModeClass } = shower.options;

    if (container.classList.contains(fullModeClass)) {
        shower.enterFullMode();
    } else {
        container.classList.add(listModeClass);
    }

    const updateModeView = () => {
        if (shower.isFullMode) {
            container.classList.remove(listModeClass);
            container.classList.add(fullModeClass);
            return;
        }

        container.classList.remove(fullModeClass);
        container.classList.add(listModeClass);

        const slide = shower.activeSlide;
        if (slide) {
            slide.element.scrollIntoView({ block: 'center' });
        }
    };

    shower.addEventListener('start', updateModeView);
    shower.addEventListener('modechange', updateModeView);

    shower.addEventListener('slidechange', () => {
        const slide = shower.activeSlide;
        slide.element.scrollIntoView({ block: 'nearest' });
    });
};
