import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { handler as serve } from '../serve.js';

describe('serve', () => {
	it('Must be function', () => {
		assert.equal(typeof serve, 'function');
	});
});
