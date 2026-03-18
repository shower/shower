import config from 'stylelint-config-pepelsbey';

export default {
	...config,
	plugins: [
		...config.plugins,
	],
	rules: {
		...config.rules,

		/* Colors */

		'color-hex-length': 'long',
		'color-named': null,
		'color-no-invalid-hex': true,

		/* Functions */

		'function-url-quotes': 'always',
		'function-name-case': 'lower',
		'function-calc-no-unspaced-operator': true,

		/* Units */

		'unit-no-unknown': true,

		/* Values */

		'value-keyword-case': 'lower',
		'value-no-vendor-prefix': true,

		/* Properties */

		'property-no-vendor-prefix': [true, {
			ignoreProperties: [
				'-webkit-text-size-adjust',
			],
		}],

		/* Declarations */

		'declaration-no-important': true,
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-single-line-max-declarations': 1,

		/* Blocks */

		'block-no-empty': true,

		/* Selectors */

		'selector-max-id': 0,
		'selector-pseudo-element-colon-notation': 'double',
		'selector-type-case': 'lower',
		'selector-attribute-quotes': 'always',

		/* Media */

		'media-feature-name-no-vendor-prefix': true,

		/* At-rules */

		'at-rule-no-vendor-prefix': true,

		/* General */

		'no-duplicate-selectors': true,
		'no-descending-specificity': null,
	},
};
