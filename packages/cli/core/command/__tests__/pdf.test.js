import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as pdf, messages } from '../pdf.js';

describe('pdf', () => {
	it('Must be function', () => {
		assert.equal(typeof pdf, 'function');
	});

	it('Messages must provided "end" message', () => {
		const { end } = messages({ output: '' });

		assert.equal(typeof end, 'string');
	});
});
