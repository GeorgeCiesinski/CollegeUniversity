import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'overrides/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        Drupal: 'readonly',
        drupalSettings: 'readonly',
        jQuery: 'readonly',
        once: 'readonly',
      },
    },
    rules: {
      // Drupal theme JS often uses classic function/`var` style in behaviors.
      'no-var': 'off',
      'prefer-const': 'off',
      'no-unused-vars': [
        'error',
        {
          // Drupal.behaviors.attach(context, settings) often omits settings.
          argsIgnorePattern: '^(_|settings)',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier,
];
