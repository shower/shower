export default (shower) => {
    const composeURL = () => {
        const search = shower.isFullMode ? '?full' : '';
        const slide = shower.activeSlide;
        const hash = slide ? `#${slide.id}` : '';

        return location.pathname + search + hash; // path is required to clear search params
    };

    const applyURLMode = () => {
        const isFull = new URLSearchParams(location.search).has('full');
        if (isFull) {
            shower.enterFullMode();
        } else {
            shower.exitFullMode();
        }
    };

    const applyURLSlide = () => {
        const id = location.hash.slice(1);
        if (!id) return;

        const target = shower.slides.find((slide) => slide.id === id);
        if (target) {
            target.activate();
        } else if (!shower.activeSlide) {
            shower.first(); // invalid hash
        }
    };

    const applyURL = () => {
        applyURLMode();
        applyURLSlide();
    };

    applyURL();
    window.addEventListener('popstate', applyURL);

    shower.addEventListener('start', () => {
        history.replaceState(null, document.title, composeURL());
    });

    shower.addEventListener('modechange', () => {
        history.replaceState(null, document.title, composeURL());
    });

    shower.addEventListener('slidechange', () => {
        const url = composeURL();
        if (!location.href.endsWith(url)) {
            history.pushState(null, document.title, url);
        }
    });
};
