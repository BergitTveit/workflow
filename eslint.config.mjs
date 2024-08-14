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
        files: ['**/*.test.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
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
