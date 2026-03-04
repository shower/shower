import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: [
      'temp/',
      'node_modules/',
      '**/__tests__/**/fixtures/',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]
