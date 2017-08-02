import EventEmitter from '../../lib/emitter';

describe('EventEmitter', () => {
    let events;

    beforeEach(() => {
        events = new EventEmitter();
    });

    it('should listen one event and call handler', done => {
        events.on('test', () => done());
        events.emit('test');
    });

    it('should call handler only once', () => {
        let counter = 0;

        events.once('test', () => {
            counter++;
        });

        events.emit('test');
        events.emit('test');

        counter.should.eq(1);
    });

    it('should correctly remove event handler', () => {
        let counter = 0;
        const handler = () => {
            counter++;
        };

        events.on('test', handler);
        events.emit('test');

        events.off('test', handler);
        events.emit('test');

        counter.should.eq(1);
    });

    it('should listen events and call handler', () => {
        let counter = 0;
        const handler = () => {
            counter++;
        };

        events.on(['test1', 'test2', 'test3'], handler);

        events.emit('test1');
        events.emit('test2');
        events.emit('test3');

        counter.should.eq(3);
    });

    it('should correctly remove events handler', () => {
        let counter = 0;
        const handler = () => {
            counter++;
        };

        events.on(['test1', 'test2', 'test3'], handler);

        events.emit('test1');
        events.emit('test2');
        events.emit('test3');

        events.off(['test1', 'test2', 'test3'], handler);

        events.emit('test1');
        events.emit('test2');
        events.emit('test3');

        counter.should.eq(3);
    });

    it('should listen event and call handler with context', done => {
        const context = { a: '44' };

        events.once('test', function () {
            this.a.should.eq('44');
            done();
        }, context);

        events.emit('test');
    });

    it('should emit event with data', done => {
        events.once('test', event => {
            event.get('test').should.eq(44);
            done();
        });

        events.emit('test', { test: 44 });
    });

    it('should prevent event', () => {
        let counter = 0;
        events.on('test', event => {
            counter++;
            event.preventDefault();
        });

        events.on('test', () => {
            counter++;
        });

        events.emit('test');
        counter.should.eq(1);
    });
});
