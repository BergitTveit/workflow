import { defineFlatConfig } from 'eslint-define-config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

const recommendedJsRules = pluginJs.configs.recommended.rules;

const prettierConfigRules = configPrettier.rules || {};

export default defineFlatConfig([
    {
        languageOptions: {
            globals: globals.browser,
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
]);
