import { freezeHistory } from '../utils';

export default shower => {
    const getURL = () => {
        const search = shower.isFullMode ? '?full' : '';
        const slide = shower.activeSlide;
        const hash = slide ? `#${slide.id}` : '';

        return location.pathname + search + hash; // path is required to clear search params
    };

    const changeSlide = () => {
        const id = location.hash.slice(1);
        if (!id) return;

        const target = shower.slides.find(slide => slide.id === id);
        if (target) {
            target.activate();
        } else if (!shower.activeSlide) {
            shower.first(); // invalid hash
        }
    };

    shower.addEventListener('modechange', () => {
        history.replaceState(null, document.title, getURL());
    });

    shower.addEventListener('slidechange', () => {
        history.pushState(null, document.title, getURL());
    });

    shower.addEventListener('start', () => {
        const isFull = new URL(location).searchParams.has('full');
        changeSlide();
        if (isFull) {
            shower.enterFullMode();
        }
    });

    window.addEventListener('popstate', () => {
        freezeHistory(() => {
            changeSlide();
            const isFull = new URL(location).searchParams.has('full');
            if (isFull) {
                shower.enterFullMode();
            } else {
                shower.exitFullMode();
            }
        });
    });
};
