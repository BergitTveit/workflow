import { defineFlatConfig } from 'eslint-define-config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginJest from 'eslint-plugin-jest';
import configPrettier from 'eslint-config-prettier';

const recommendedJsRules = pluginJs.configs.recommended.rules;
const recommendedJestRules = pluginJest.configs.recommended.rules;
const prettierConfigRules = configPrettier.rules || {};

export default defineFlatConfig([
    {
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            ...recommendedJsRules,
            'prettier/prettier': 'error',
            ...prettierConfigRules,
        },
    },
    {
        files: ['**/*.test.js', '**/*.test.ts', '**/*.mock.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
                ...globals.node,
                global: 'writable',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            },
        },
        plugins: {
            jest: pluginJest,
        },
        rules: {
            ...recommendedJestRules,
            'jest/prefer-expect-assertions': 'off',
        },
    },
]);
