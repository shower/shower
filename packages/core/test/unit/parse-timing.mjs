import p from '../../lib/modules/timer/parse-timing.mjs';

describe('parseTiming', () => {
    it('empty string', () => {
        p('').should.eq(0);
    });

    describe('colon notation', () => {
        it('seconds', () => {
            p('1').should.eq(1e3);
            p('1  ').should.eq(1e3);

            p('01').should.eq(1e3);
            p('001').should.eq(1e3);

            p('.5').should.eq(500);
            p('-2').should.eq(0);
        });

        it('minutes', () => {
            p('1:2').should.eq(62e3);
            p('  1 :\t2').should.eq(62e3);

            p('01:2').should.eq(62e3);
            p('001:2').should.eq(62e3);

            p('.5:2').should.eq(32e3);
            p('-1.0:-2').should.eq(0);
        });

        it('hours', () => {
            p('1:2:3').should.eq(3723e3);
            p('\n1  \t:2:   3 ').should.eq(3723e3);

            p('01:2:3').should.eq(3723e3);
            p('001:2:3').should.eq(3723e3);

            p('1.2:2:3').should.eq(4443e3);
            p('-1:-2.:3').should.eq(0);
        });
    });

    describe('component notation', () => {
        it('seconds', () => {
            p('1s').should.eq(1e3);
            p('  1s').should.eq(1e3);

            p('01s').should.eq(1e3);
            p('001s').should.eq(1e3);

            p('.5s').should.eq(500);
            p('-2s').should.eq(0);
        });

        it('minutes', () => {
            p('1m').should.eq(6e4);
            p('  2s :\t1m').should.eq(62e3);

            p('01m').should.eq(6e4);
            p('001m 2s').should.eq(62e3);

            p('2s .5m').should.eq(32e3);
            p('-1.0m -2s').should.eq(0);
        });

        it('hours', () => {
            p('1h 2m 3s').should.eq(3723e3);
            p('\n2m  \t3s   1h ').should.eq(3723e3);

            p('3s 2m 01h').should.eq(3723e3);
            p('001h 3s 2m').should.eq(3723e3);

            p('1.2h 2m 3s').should.eq(4443e3);
            p('-2.m 3s -1h').should.eq(0);
        });
    });
});
