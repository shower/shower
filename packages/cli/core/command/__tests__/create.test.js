import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as create, messages } from '../create.js';

describe('create', () => {
	it('Must be function', () => {
		assert.equal(typeof create, 'function');
	});

	it('Messages must provided "end" message', () => {
		const { end } = messages({ directory: '' });

		assert.equal(typeof end, 'string');
	});
});
