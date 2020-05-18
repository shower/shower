import parseTiming from './parse-timing';

export default (shower) => {
    let id;

    const resetTimer = () => {
        clearTimeout(id);
        if (shower.isListMode) return;

        const slide = shower.activeSlide;
        const { visitCount, innerStepCount } = slide.state;
        if (visitCount > 1) return;

        const timing = parseTiming(slide.element.dataset.timing);
        if (!timing) return;

        if (innerStepCount) {
            const stepTiming = timing / (innerStepCount + 1);
            id = setInterval(() => shower.next(), stepTiming);
        } else {
            id = setTimeout(() => shower.next(), timing);
        }
    };

    shower.addEventListener('start', resetTimer);
    shower.addEventListener('modechange', resetTimer);
    shower.addEventListener('slidechange', resetTimer);

    shower.container.addEventListener('keydown', (event) => {
        if (!event.defaultPrevented) {
            clearTimeout(id);
        }
    });
};
