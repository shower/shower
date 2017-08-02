export default shower => {
    const { player } = shower;
    const getSlideByHash = () => {
        const id = location.hash.slice(1);

        return shower.getSlides().find(slide => slide.getId() === id);
    };

    player.events.on('activate', event => {
        location.hash = event.get('slide').getId();
    });

    const onHashChange = () => {
        const slide = getSlideByHash();
        if (slide) {
            player.go(slide);
        } else if (!player.getCurrentSlide()) {
            if (shower.container.isSlideMode() || location.hash) {
                player.first();
            }
        }
    };

    addEventListener('hashchange', onHashChange);
    onHashChange();
};
