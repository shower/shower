import { handler as pdf, messages } from '../pdf.js';

it('Must be function', () => {
	expect(typeof pdf).toBe('function');
});

it('Messages must provided "start" and "end" messages', () => {
	const { start, end } = messages({ file: '' });

	expect(typeof start).toBe('string');
	expect(typeof end).toBe('string');
});
