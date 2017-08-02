import { shower } from '../../lib';
import Slide from '../../lib/slide';

describe('Player', () => {
    const { player } = shower;

    beforeEach(() => {
        player.go(0);
    });

    it('Should turn to the custom slide', () => {
        player.go(2);
        player.getCurrentSlideIndex().should.eq(2);
    });

    it('Should turn to the next slide', () => {
        player.next();
        player.getCurrentSlideIndex().should.eq(1);
    });

    it('Should turn to the prev slide', () => {
        player.go(2);
        player.prev();
        player.getCurrentSlideIndex().should.eq(1);
    });

    it('Should go to the last slide', () => {
        player.last();
        player.getCurrentSlideIndex().should.eq(shower.getSlidesCount() - 1);
    });

    it('Should go to the first slide', () => {
        player.last();
        player.first();
        player.getCurrentSlideIndex().should.eq(0);
    });

    it('Should return current slide', () => {
        const slide = new Slide('asdf');
        shower.add(slide);

        player.last();
        player.getCurrentSlide().should.eq(slide);

        shower.remove(slide);
    });
});
