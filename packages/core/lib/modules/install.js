import a11y from './a11y.js';
import keys from './keys.js';
import location from './location.js';
import next from './next.js';
import progress from './progress.js';
import timer from './timer.js';
import title from './title.js';
import view from './view.js';
import touch from './touch.js';
import mouse from './mouse.js';

export default (shower) => {
	a11y(shower);
	progress(shower);
	keys(shower);
	next(shower);
	timer(shower); // should come after `keys` and `next`
	title(shower);
	location(shower); // should come after `title`
	view(shower);
	touch(shower);
	mouse(shower);

	// maintains invariant: active slide always exists in `full` mode
	if (shower.isFullMode && !shower.activeSlide) {
		shower.first();
	}
};
