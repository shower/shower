import { freezeHistory } from '../utils';

export default shower => {
    const composeURL = () => {
        const search = shower.isFullMode ? '?full' : '';
        const slide = shower.activeSlide;
        const hash = slide ? `#${slide.id}` : '';

        return location.pathname + search + hash; // path is required to clear search params
    };

    const applyURLMode = () => {
        const isFull = new URL(location).searchParams.has('full');

        freezeHistory(() => {
            if (isFull) {
                shower.enterFullMode();
            } else {
                shower.exitFullMode();
            }
        });
    };

    const applyURLSlide = () => {
        const id = location.hash.slice(1);
        if (!id) return;

        const target = shower.slides.find(slide => slide.id === id);
        if (target) {
            freezeHistory(() => {
                target.activate();
            });
        } else if (!shower.activeSlide) {
            shower.first(); // invalid hash
        }
    };

    const applyURL = () => {
        applyURLMode();
        applyURLSlide();
    };

    shower.addEventListener('modechange', () => {
        history.replaceState(null, document.title, composeURL());
    });

    shower.addEventListener('slidechange', () => {
        history.pushState(null, document.title, composeURL());
    });

    shower.addEventListener('start', applyURL);
    window.addEventListener('popstate', applyURL);
};
