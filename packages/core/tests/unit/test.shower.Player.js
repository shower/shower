shower.modules.define('test.shower.Player', [
    'shower',
    'Slide'
], function (provide, shower, Slide) {

    var shower = shower.getInited()[0];

    describe('shower.Player', function () {
        var player = shower.player;

        beforeEach(function () {
            player.go(0);
        });

        afterEach(function () {
            player.go(0);
        });

        it('Should turn to the custom slide', function () {
            player.go(2);
            player.getCurrentSlideIndex().should.eq(2);
        });

        it('Should turn to the next slide', function () {
            player.next();
            player.getCurrentSlideIndex().should.eq(1);
        });

        it('Should turn to the prev slide', function () {
            player.go(2);
            player.prev();
            player.getCurrentSlideIndex().should.eq(1);
        });

        it('Should go to the last slide', function () {
            player.last();
            player.getCurrentSlideIndex().should.eq(shower.getSlidesCount() - 1);
        });

        it('Should go to the first slide', function () {
            player.last();
            player.first();
            player.getCurrentSlideIndex().should.eq(0);
        });

        it('Should return current slide', function () {
            var slide = new Slide('asdf');
            shower.add(slide);

            player.last();
            player.getCurrentSlide().should.eq(slide);

            shower.remove(slide);
        });
    });

    provide();
});
