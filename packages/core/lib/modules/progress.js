export default (shower) => {
    const { progressSelector } = shower.options;
    const bar = shower.container.querySelector(progressSelector);
    if (!bar) return;

    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', 0);
    bar.setAttribute('aria-valuemax', 100);

    const updateProgress = () => {
        const index = shower.activeSlideIndex;
        const { length } = shower.slides;
        const progress = (index / (length - 1)) * 100;

        bar.style.width = `${progress}%`;
        bar.setAttribute('aria-valuenow', progress);
        bar.setAttribute('aria-valuetext', `Slideshow progress: ${progress}%`);
    };

    shower.addEventListener('start', updateProgress);
    shower.addEventListener('slidechange', updateProgress);
};
