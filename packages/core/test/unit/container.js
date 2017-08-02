import { Container } from '../../lib/shower';
import { shower } from '../../lib';

describe('Container', () => {
    let containerEl;
    let container;

    before(() => {
        containerEl = document.createElement('div');
        containerEl.id = 'shower-test-container';

        document.body.appendChild(containerEl);
    });

    after(() => {
        containerEl.parentNode.removeChild(containerEl);
    });

    beforeEach(() => {
        container = new Container(shower, containerEl);
    });

    it('Should turn to the slide mode', () => {
        container.enterSlideMode();

        document.body.should.have.class('full');
    });

    it('Should turn to the list mode', () => {
        container.enterSlideMode().exitSlideMode();

        document.body.should.not.have.class('full');
        document.body.should.have.class('list');
    });

    it('Should return the container element', () => {
        container.getElement().should.eq(containerEl);
    });
});
