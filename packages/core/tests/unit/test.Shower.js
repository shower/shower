shower.modules.define('test.Shower', [
    'shower',
    'Slide'
], function (provide, showerGlobal, Slide) {

    var shower;

    describe('Shower', function () {
        it('Should be ready', function () {
            showerGlobal.ready().should.be.true;
            shower = showerGlobal.getInited()[0];
        });

        it('Should add slide to the Shower', function () {
            var slide = new Slide('test slide');
            shower.add(slide);

            shower.getSlideIndex(slide).should.not.eq(-1);
        });

        it('Should remove slide from the Shower', function () {
            var slide = new Slide('test slide');
            shower.add(slide);
            shower.getSlideIndex(slide).should.not.eq(-1);

            shower.remove(slide);
            shower.getSlideIndex(slide).should.eq(-1);
        });

        it('Should get slide by the index', function () {
            var slide = new Slide('test slide'),
                slidesCount = shower.getSlidesCount();

            shower.add(slide);

            // slidesCount == last index + 1
            shower.get(slidesCount).should.eq(slide);
        });

        it('Should change count of slides after add', function () {
            var slide = new Slide('test slide'),
                oldCount = shower.getSlidesCount();

            shower.add(slide);
            shower.getSlidesCount().should.eq(oldCount + 1);
        });
    });

    provide();
});
