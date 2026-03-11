import { test, expect } from '@playwright/test';
import parseTiming from '../lib/modules/parse-timing.js';

const p = parseTiming;

test.describe('parse-timing', () => {
	test('empty string', () => {
		expect(p('')).toBe(0);
	});

	test.describe('colon notation', () => {
		test('seconds', () => {
			expect(p('1')).toBe(1e3);
			expect(p('1  ')).toBe(1e3);

			expect(p('01')).toBe(1e3);
			expect(p('001')).toBe(1e3);

			expect(p('.5')).toBe(500);
			expect(p('-2')).toBe(0);
		});

		test('minutes', () => {
			expect(p('1:2')).toBe(62e3);
			expect(p('  1 :\t2')).toBe(62e3);

			expect(p('01:2')).toBe(62e3);
			expect(p('001:2')).toBe(62e3);

			expect(p('.5:2')).toBe(32e3);
			expect(p('-1.0:-2')).toBe(0);
		});

		test('hours', () => {
			expect(p('1:2:3')).toBe(3723e3);
			expect(p('\n1  \t:2:   3 ')).toBe(3723e3);

			expect(p('01:2:3')).toBe(3723e3);
			expect(p('001:2:3')).toBe(3723e3);

			expect(p('1.2:2:3')).toBe(4443e3);
			expect(p('-1:-2.:3')).toBe(0);
		});
	});

	test.describe('component notation', () => {
		test('seconds', () => {
			expect(p('1s')).toBe(1e3);
			expect(p('  1s')).toBe(1e3);

			expect(p('01s')).toBe(1e3);
			expect(p('001s')).toBe(1e3);

			expect(p('.5s')).toBe(500);
			expect(p('-2s')).toBe(0);
		});

		test('minutes', () => {
			expect(p('1m')).toBe(6e4);
			expect(p('  2s :\t1m')).toBe(62e3);

			expect(p('01m')).toBe(6e4);
			expect(p('001m 2s')).toBe(62e3);

			expect(p('2s .5m')).toBe(32e3);
			expect(p('-1.0m -2s')).toBe(0);
		});

		test('hours', () => {
			expect(p('1h 2m 3s')).toBe(3723e3);
			expect(p('\n2m  \t3s   1h ')).toBe(3723e3);

			expect(p('3s 2m 01h')).toBe(3723e3);
			expect(p('001h 3s 2m')).toBe(3723e3);

			expect(p('1.2h 2m 3s')).toBe(4443e3);
			expect(p('-2.m 3s -1h')).toBe(0);
		});
	});
});
