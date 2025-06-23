import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.config({
    extends: [
      'eslint:recommended',
    ],
    env: {
      node: true,
      es2021: true,
    },
  }),
  ...tseslint.config({
    parserOptions: {
      project: './tsconfig.json',
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
]; 