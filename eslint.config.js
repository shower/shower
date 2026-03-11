import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,

	{
		ignores: [
			'**/dist/**',
			'**/node_modules/**',
			'packages/cli/core/command/__tests__/**/fixtures/**',
		],
	},

	// Browser code: core engine
	{
		files: ['packages/core/lib/**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},

	// Test files: core (Playwright) + cli (Jest)
	{
		files: ['packages/core/tests/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
	},
	{
		files: ['packages/cli/**/__tests__/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
	},

	// Everything else: Node.js (CLI source, build configs, test servers, gulpfile)
	{
		ignores: ['packages/core/lib/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
