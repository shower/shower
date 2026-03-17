import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,

	{
		ignores: [
			'**/dist/**',
			'**/bundled/**',
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

	// Test files: core (Playwright)
	{
		files: ['packages/core/tests/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
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
