export default (shower) => {
    const { stepSelector, activeSlideClass, visitedSlideClass } = shower.options;

    let innerSteps;
    let innerAt;

    const getInnerSteps = () => {
        const { element } = shower.activeSlide;
        return [...element.querySelectorAll(stepSelector)];
    };

    const getInnerAt = () => {
        return innerSteps.filter(
            (step) =>
                step.classList.contains(activeSlideClass) ||
                step.classList.contains(visitedSlideClass),
        ).length;
    };

    const setInnerStepsState = () => {
        if (shower.isListMode) return;

        innerSteps = getInnerSteps();
        innerAt = getInnerAt();

        const slide = shower.activeSlide;
        slide.state.innerStepCount = innerSteps.length;
    };

    shower.addEventListener('start', setInnerStepsState);
    shower.addEventListener('modechange', setInnerStepsState);
    shower.addEventListener('slidechange', setInnerStepsState);

    shower.addEventListener('next', (event) => {
        if (shower.isListMode || event.defaultPrevented || !event.cancelable) return;

        innerAt++;
        innerSteps.forEach((step, index) => {
            step.classList.toggle(visitedSlideClass, index < innerAt - 1);
            step.classList.toggle(activeSlideClass, index === innerAt - 1);
        });

        if (innerAt <= innerSteps.length) {
            event.preventDefault();
        }
    });

    shower.addEventListener('prev', (event) => {
        if (shower.isListMode || event.defaultPrevented || !event.cancelable || !innerAt) return;

        if (innerAt === innerSteps.length) {
            const lastStep = innerSteps[innerAt - 1];
            lastStep.classList.replace(activeSlideClass, visitedSlideClass);
            return;
        }

        innerAt--;
        innerSteps.forEach((step, index) => {
            step.classList.toggle(visitedSlideClass, index < innerAt);
            step.classList.toggle(activeSlideClass, index === innerAt - 1);
        });

        event.preventDefault();
    });
};
