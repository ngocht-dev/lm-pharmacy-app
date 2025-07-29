import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-native': fixupPluginRules(reactNative),
      prettier,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __DEV__: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'prettier/prettier': 'error',

      'no-console': [
        'warn',
        {
          allow: ['tron'],
        },
      ],

      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],

      'class-methods-use-this': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-require-imports': 'off', // Allow require() for assets
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/jsx-props-no-spreading': 'off',

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/function-component-definition': 'off',
      'react/display-name': 'off',
      'arrow-body-style': 'off',

      // React Native specific rules - more lenient for development
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'off', // Disabled due to compatibility issues
    },
  },
  {
    ignores: ['dist/*', 'node_modules/*'],
  },
];
