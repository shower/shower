import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as archive, messages } from '../archive.js';

describe('archive', () => {
	it('Must be function', () => {
		assert.equal(typeof archive, 'function');
	});

	it('Messages must provided "start" and "end" messages', () => {
		const { start, end } = messages({ output: '' });

		assert.equal(typeof start, 'string');
		assert.equal(typeof end, 'string');
	});
});
