import parseTiming from './parse-timing';

/**
 * @class
 * @name Timer
 *
 * Timer plugin for shower.
 *
 * @param {Shower} shower
 */
class Timer {
    constructor(shower) {
        this._shower = shower;
        this._clearTimer = () => {};
        this._setupListeners();
    }

    _setupListeners() {
        document.addEventListener('keydown', event => {
            if (!event.defaultPrevented) {
                this._clearTimer();
            }
        });

        this._showerListeners = this._shower.events.group()
            .on('destroy', this._destroy.bind(this));

        this._playerListeners = this._shower.player.events.group()
            .on('activate', this._onSlideActivate.bind(this));

        if (this._shower.player.getCurrentSlideIndex() !== -1) {
            this._onSlideActivate();
        }
    }

    _onSlideActivate() {
        this._clearTimer();
        if (!this._shower.container.isSlideMode()) return;

        const slide = this._shower.player.getCurrentSlide();
        if (slide.state.get('visited') > 1) return;

        const timing = parseTiming(slide.layout.getData('timing'));
        if (timing) this._setTimer(timing);
    }

    _setTimer(timing) {
        const plugin = this._shower.plugins.get('next');
        if (plugin && plugin.canGoNext) {
            const id = setInterval(() => {
                this._shower.player.next();
            }, timing / (plugin.stepsCount + 1));

            this._clearTimer = () => {
                clearInterval(id);
            };
        } else {
            const id = setTimeout(() => {
                this._shower.player.next();
            }, timing);

            this._clearTimer = () => {
                clearTimeout(id);
            };
        }
    }

    _destroy() {
        this._shower = null;
        this._clearTimer();
        this._clearListeners();
    }

    _clearListeners() {
        this._showerListeners.offAll();
        this._playerListeners.offAll();
    }
}

export default Timer;
