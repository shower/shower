shower.modules.define('test.Emitter', [
    'Emitter'
], function (provide, EventEmitter) {

    describe('Emitter', function () {
        var events;

        beforeEach(function () {
            events = new EventEmitter();
        });

        afterEach(function () {
            events = null;
        });

        it('should listen one event and call handler', function (done) {
            events.on('test', function () {
                done();
            });

            events.emit('test');
        });

        it('should call handler only once', function () {
            var counter = 0;

            events.once('test', function () {
                counter++;
            });

            events.emit('test');
            events.emit('test');

            counter.should.eq(1);
        });

        it('should correctly remove event handler', function () {
            var counter = 0,
                handler = function () {
                    counter++;
                };

            events.on('test', handler);
            events.emit('test');

            events.off('test', handler);
            events.emit('test');

            counter.should.eq(1);
        });

        it('should listen events and call handler', function () {
            var counter = 0,
                handler = function () {
                    counter++;
                };

            events.on(['test1', 'test2', 'test3'], handler);

            events.emit('test1');
            events.emit('test2');
            events.emit('test3');

            counter.should.eq(3);
        });

        it('should correctly remove events handler', function () {
            var counter = 0,
                handler = function () {
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

        it('should listen event and call handler with context', function (done) {
            var context = {
                a: '44'
            };

            events.once('test', function () {
                this.a.should.eq('44');
                done();
            }, context);

            events.emit('test');
        });

        it('should emit event with data', function (done) {
            events.once('test', function (e) {
                e.get('test').should.eq(44);
                done();
            });

            events.emit('test', {
                test: 44
            });
        });

        it('should prevent event', function () {
            var counter = 0;
            events.on('test', function (e) {
                counter++;
            });

            events.on('test', function (e) {
                counter++;
                e.preventDefault();
            });

            events.emit('test');
            counter.should.eq(1);
        });
    });

    provide();
});
