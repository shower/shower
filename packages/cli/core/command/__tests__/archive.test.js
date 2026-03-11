import { handler as archive, messages } from '../archive.js';

it('Must be function', () => {
	expect(typeof archive).toBe('function');
});

it('Messages must provided "start" and "end" messages', () => {
	const { start, end } = messages({ output: '' });

	expect(typeof start).toBe('string');
	expect(typeof end).toBe('string');
});
