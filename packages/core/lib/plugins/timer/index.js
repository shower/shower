import parseTiming from './parse-timing';

export default shower => {
    let id;

    const goNext = () => {
        shower.player.next();
    };

    const setTimer = (slide, timing) => {
        const { innerStepsCount } = slide.state;
        if (innerStepsCount) {
            const stepTiming = timing / (innerStepsCount + 1);
            id = setInterval(goNext, stepTiming);
        } else {
            id = setTimeout(goNext, timing);
        }
    };

    const clearTimer = () => {
        clearTimeout(id);
    };

    const onSlideActivate = () => {
        clearTimer();
        if (!shower.container.isSlideMode()) return;

        const slide = shower.player.getCurrentSlide();
        if (slide.state.visited > 1) return;

        const slideElement = slide.layout.getElement();
        const timing = parseTiming(slideElement.dataset.timing);
        if (timing) setTimer(slide, timing);
    };

    const containerElement = shower.container.getElement();
    containerElement.addEventListener('keydown', event => {
        if (!event.defaultPrevented) {
            clearTimer();
        }
    });

    shower.player.events.on('activate', onSlideActivate);

    if (shower.player.getCurrentSlideIndex() !== -1) {
        onSlideActivate();
    }
};
