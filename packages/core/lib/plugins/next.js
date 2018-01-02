export default (shower, options) => {
    const stepsSelector = options.selector || '.next';
    const activeClass = shower.options.slide_active_classname;

    let innerSteps;
    let innerAt;

    const onSlideActivate = () => {
        innerSteps = getInnerSteps();
        innerAt = getInnerAt();

        const slide = shower.player.getCurrentSlide();
        slide.state.innerStepsCount = innerSteps.length;
    };

    const getInnerSteps = () => {
        const { layout } = shower.player.getCurrentSlide();
        const slideElement = layout.getElement();

        return [...slideElement.querySelectorAll(stepsSelector)];
    };

    const getInnerAt = () => {
        return innerSteps
            .filter(step => step.classList.contains(activeClass))
            .length;
    };

    const toggleActive = () => {
        innerSteps.forEach((step, index) => {
            step.classList.toggle(activeClass, index < innerAt);
        });
    };

    const onNext = event => {
        const canGoNext = shower.container.isSlideMode()
            && innerAt < innerSteps.length;

        if (!canGoNext) return;

        event.preventDefault();
        innerAt++;
        toggleActive();
    };

    const onPrev = event => {
        const canGoPrev = shower.container.isSlideMode()
            && innerAt > 0
            && innerAt < innerSteps.length;

        if (!canGoPrev) return;

        event.preventDefault();
        innerAt--;
        toggleActive();
    };

    if (shower.player.getCurrentSlideIndex() !== -1) {
        onSlideActivate();
    }

    shower.player.events.group()
        .on('activate', onSlideActivate)
        .on('next', onNext)
        .on('prev', onPrev);
};
