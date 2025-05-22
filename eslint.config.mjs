// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import checkFile from 'eslint-plugin-check-file';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'plugin:@typescript-eslint/recommended'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'off',

      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],

      'import/no-restricted-paths': [
        'error',
        {
          basePath: './src',
          zones: [
            // ❌ shared не может использовать ничего выше себя и server
            {
              target: './shared',
              except: [],
              from: [
                './features',
                './entities',
                './widgets',
                './app',
                './server',
              ],
            },

            // ❌ entities не может использовать features, widgets, processes, app, server
            {
              target: './entities',
              from: ['./features', './widgets', './app', './server'],
            },

            // ❌ features не может использовать widgets, processes, app, server
            {
              target: './features',
              from: ['./widgets', './app', './server'],
            },

            // ❌ widgets не может использовать app, server
            {
              target: './widgets',
              from: ['./app', './server'],
            },

            // ❌ server не может ничего использовать кроме shared, entities, app

            {
              target: './server',
              except: [],
              from: ['./features', './widgets', './app'],
            },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  }),
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  {
    plugins: {
      'check-file': checkFile,
    },
  },
];

export default eslintConfig;
