import parseTiming from './parse-timing';

export default shower => {
    let id;

    const setTimer = () => {
        clearTimeout(id);
        if (shower.isListMode) return;

        const slide = shower.activeSlide;
        const { visitsCount, innerStepsCount } = slide.state;
        if (visitsCount > 1) return;

        const timing = parseTiming(slide.element.dataset.timing);
        if (!timing) return;

        if (innerStepsCount) {
            const stepTiming = timing / (innerStepsCount + 1);
            id = setInterval(() => shower.next(), stepTiming);
        } else {
            id = setTimeout(() => shower.next(), timing);
        }
    };

    shower.addEventListener('modechange', setTimer);
    shower.addEventListener('slidechange', setTimer);

    shower.container.addEventListener('keydown', event => {
        if (!event.defaultPrevented) {
            clearTimeout(id);
        }
    });
};
