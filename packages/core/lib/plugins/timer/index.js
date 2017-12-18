import parseTiming from './parse-timing';

export default shower => {
    let id;

    const goNext = () => {
        shower.player.next();
    };

    const setTimer = timing => {
        const plugin = shower.plugins.get('next');
        if (plugin && plugin.canGoNext) {
            const stepTiming = timing / (plugin.stepsCount + 1);
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
        if (slide.state.get('visited') > 1) return;

        const timing = parseTiming(slide.layout.getData('timing'));
        if (timing) setTimer(timing);
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
