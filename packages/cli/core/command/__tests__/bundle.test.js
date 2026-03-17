import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as bundle, messages } from '../bundle.js';

describe('bundle', () => {
	it('Must be function', () => {
		assert.equal(typeof bundle, 'function');
	});

	it('Messages must provided "start" and "end" messages', () => {
		const { start, end } = messages({ output: '' });

		assert.equal(typeof start, 'string');
		assert.equal(typeof end, 'string');
	});
});
