export default (shower) => {
    const { stepSelector, activeSlideClass, visitedSlideClass } = shower.options;

    let innerSteps;
    let activeIndex;

    const isActive = (step) => step.classList.contains(activeSlideClass);
    const isVisited = (step) => step.classList.contains(visitedSlideClass);

    const setInnerStepsState = () => {
        if (shower.isListMode) return;

        const slide = shower.activeSlide;

        innerSteps = [...slide.element.querySelectorAll(stepSelector)];
        activeIndex =
            innerSteps.length && innerSteps.every(isVisited)
                ? innerSteps.length
                : innerSteps.filter(isActive).length - 1;

        slide.state.innerStepCount = innerSteps.length;
    };

    shower.addEventListener('start', setInnerStepsState);
    shower.addEventListener('modechange', setInnerStepsState);
    shower.addEventListener('slidechange', setInnerStepsState);

    shower.addEventListener('next', (event) => {
        if (shower.isListMode || event.defaultPrevented || !event.cancelable) return;

        activeIndex++;
        innerSteps.forEach((step, index) => {
            step.classList.toggle(visitedSlideClass, index < activeIndex);
            step.classList.toggle(activeSlideClass, index === activeIndex);
        });

        if (activeIndex < innerSteps.length) {
            event.preventDefault();
        }
    });

    shower.addEventListener('prev', (event) => {
        if (shower.isListMode || event.defaultPrevented || !event.cancelable) return;
        if (activeIndex === -1 || activeIndex === innerSteps.length) return;

        activeIndex--;
        innerSteps.forEach((step, index) => {
            step.classList.toggle(visitedSlideClass, index < activeIndex + 1);
            step.classList.toggle(activeSlideClass, index === activeIndex);
        });

        event.preventDefault();
    });
};
