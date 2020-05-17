const mdash = '\u2014';

export default (shower) => {
    const { title } = document;
    const updateTitle = () => {
        if (shower.isFullMode) {
            const slide = shower.activeSlide;
            const slideTitle = slide.title;
            if (slideTitle) {
                document.title = `${slideTitle} ${mdash} ${title}`;
                return;
            }
        }

        document.title = title;
    };

    shower.addEventListener('start', updateTitle);
    shower.addEventListener('modechange', updateTitle);
    shower.addEventListener('slidechange', updateTitle);
};
