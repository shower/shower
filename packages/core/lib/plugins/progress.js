export default (shower, options) => {
    const containerElement = shower.container.getElement();
    const progressSelector = options.selector || '.progress';
    const bar = containerElement.querySelector(progressSelector);
    if (!bar) return;

    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', 0);
    bar.setAttribute('aria-valuemax', 100);

    const updateProgress = () => {
        const current = shower.player.getCurrentSlideIndex();
        if (current === -1) return;

        const total = shower.getSlidesCount();
        const progress = current / (total - 1) * 100;

        bar.style.width = `${progress}%`;
        bar.setAttribute('aria-valuenow', progress);
        bar.setAttribute('aria-valuetext', `Slideshow progress: ${progress}%`);
    };

    shower.player.events.on('activate', updateProgress);
    updateProgress();
};
