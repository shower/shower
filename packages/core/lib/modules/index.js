import a11y from './a11y';
import keys from './keys';
import location from './location';
import next from './next';
import progress from './progress';
import scale from './scale';
import timer from './timer';
import title from './title';
import view from './view';

export default (shower) => {
    a11y(shower);
    keys(shower); // should come before `timer`
    progress(shower);
    next(shower); // should come before `timer`
    timer(shower);
    title(shower); // should come before `location`
    location(shower);
    view(shower);
    scale(shower);
};
