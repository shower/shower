const mdash = '\u2014';

export default shower => {
    const { title } = document;
    const updateTitle = () => {
        if (shower.container.isSlideMode()) {
            const slide = shower.player.getCurrentSlide();
            const slideTitle = slide.getTitle();
            if (slideTitle) {
                document.title = `${slideTitle} ${mdash} ${title}`;
                return;
            }
        }

        document.title = title;
    };

    shower.player.events.on('activate', updateTitle);
    shower.container.events.on('modechange', updateTitle);
};
