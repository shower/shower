import { shower } from '../../lib';
import Slide from '../../lib/slide';

describe('Shower', () => {
    let slide;

    beforeEach(() => {
        slide = new Slide('test slide');
    });

    it('should add slide to the Shower', () => {
        shower.add(slide);
        shower.getSlideIndex(slide).should.not.eq(-1);
    });

    it('should remove slide from the Shower', () => {
        shower.add(slide);
        shower.getSlideIndex(slide).should.not.eq(-1);

        shower.remove(slide);
        shower.getSlideIndex(slide).should.eq(-1);
    });

    it('should get slide by the index', () => {
        const count = shower.getSlidesCount();

        shower.add(slide);
        shower.get(count).should.eq(slide);
    });

    it('should change count of slides after add', () => {
        const oldCount = shower.getSlidesCount();

        shower.add(slide);
        shower.getSlidesCount().should.eq(oldCount + 1);
    });
});
