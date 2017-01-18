shower.modules.define('test.Slide', [
    'Slide'
], function (provide, Slide) {

    describe('Slide', function () {
        var slide;

        beforeEach(function () {
            slide = new Slide('test test');
        });

        afterEach(function () {
            slide.destroy();
            slide = null;
        });

        it('should create new slide with content', function () {
            new Slide('test test');
        });

        it('should create new slide from element', function () {
            var slideElement = document.createElement('div');
            document.body.appendChild(slideElement);

            new Slide(slideElement);

            slideElement.parentNode.removeChild(slideElement);
        });

        it('should fire event and change visited state after activate', function (done) {
            slide.events.once('activate', function () {
                slide.state.get('visited').should.eq(1);
                done();
            });

            slide.activate();
        });

        it('should fire event after deactivate', function (done) {
            slide.activate();
            slide.events.once('deactivate', function () {
                done();
            });
            slide.deactivate();
        });

        it('should not be active after create', function () {
            slide.isActive().should.be.false;
        });

        it('should be active after activate', function () {
            slide.activate();
            slide.isActive().should.be.true;
        });

        it('should not be visited after create', function () {
            slide.isVisited().should.be.false;
        });

        it('should not be visited after activate', function () {
            slide.activate();
            slide.isVisited().should.be.true;
        });

        it('should auto init layout after create', function () {
            slide.layout.should.not.be.undefined;
        });
    });

    provide();
});
