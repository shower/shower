import Slide from '../../lib/slide';

describe('Slide', () => {
    let slide;

    beforeEach(() => {
        slide = new Slide('test test');
    });

    it('should create new slide from element', () => {
        const slideEl = document.createElement('div');
        document.body.appendChild(slideEl);

        (() => new Slide(slideEl)).should.not.throw();

        slideEl.parentNode.removeChild(slideEl);
    });

    it('should fire event and change visited state after activate', done => {
        slide.events.once('activate', () => {
            slide.state.get('visited').should.eq(1);
            done();
        });

        slide.activate();
    });

    it('should fire event after deactivate', done => {
        slide.activate();
        slide.events.once('deactivate', () => done());
        slide.deactivate();
    });

    it('should not be active after create', () => {
        slide.isActive().should.be.false;
    });

    it('should be active after activate', () => {
        slide.activate();
        slide.isActive().should.be.true;
    });

    it('should not be visited after create', () => {
        slide.isVisited().should.be.false;
    });

    it('should not be visited after activate', () => {
        slide.activate();
        slide.isVisited().should.be.true;
    });

    it('should auto init layout after create', () => {
        slide.layout.should.not.be.undefined;
    });
});
