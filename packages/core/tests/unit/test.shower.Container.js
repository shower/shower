shower.modules.define('test.shower.Container', [
    'shower',
    'shower.Container'
], function (provide, shower, Container) {

    var shower = shower.getInited()[0];

    describe('shower.Container', function () {
        var containerElement,
            container;

        before(function () {
            containerElement = document.createElement('div');
            containerElement.id = 'shower-test-container';

            document.body.appendChild(containerElement);
        });

        after(function () {
            containerElement.parentNode
                .removeChild(containerElement);
        });

        beforeEach(function () {
            container = new Container(shower, containerElement);
        });

        afterEach(function () {
            container.destroy();
        });

        it('Should turn to the slide mode', function () {
            container.enterSlideMode();
            document.body.should.have.class('full');
        });

        it('Should turn to the list mode', function () {
            container
                .enterSlideMode()
                .exitSlideMode();

            document.body.should.not.have.class('full');
            document.body.should.have.class('list');
        });

        it('Should return the container element', function () {
            container.getElement().should.eq(containerElement);
        });
    });

    provide();
});
