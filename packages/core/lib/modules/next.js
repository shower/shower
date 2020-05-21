export default (shower) => {
    const { stepSelector, activeSlideClass, visitedSlideClass } = shower.options;
    const activeOrVisitedStepSelector = `${stepSelector}.${activeSlideClass}, ${stepSelector}.${visitedSlideClass}`;

    let innerSteps;
    let innerAt;

    const setInnerStepsState = () => {
        if (shower.isListMode) return;

        const slide = shower.activeSlide;

        innerAt = slide.element.querySelectorAll(activeOrVisitedStepSelector).length;
        innerSteps = slide.element.querySelectorAll(stepSelector);

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
