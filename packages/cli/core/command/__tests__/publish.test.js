import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as publish, messages } from '../publish.js';

describe('publish', () => {
	it('Must be function', () => {
		assert.equal(typeof publish, 'function');
	});

	it('Messages must provided "end" message', () => {
		const { end } = messages({});

		assert.equal(typeof end, 'string');
	});
});
