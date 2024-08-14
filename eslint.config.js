import jseslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
const config = tseslint.config(
  jseslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'sort-imports': [
        'warn',
        {
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
);

export default config;
