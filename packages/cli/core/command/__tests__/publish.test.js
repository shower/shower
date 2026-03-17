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

	it('Messages "end" should contain default text when no result', () => {
		const { end } = messages({});

		assert.ok(end.includes('Slides are published'));
	});

	it('Messages "end" should contain default text when result has no url', () => {
		const { end } = messages({}, {});

		assert.ok(end.includes('Slides are published'));
		assert.ok(!end.includes('github.io'));
	});

	it('Messages "end" should include URL when result contains url', () => {
		const url = 'https://user.github.io/repo/';
		const { end } = messages({}, { url });

		assert.ok(end.includes('Slides are published'));
		assert.ok(end.includes(url));
	});
});
