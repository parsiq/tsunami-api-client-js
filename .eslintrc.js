module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['tsconfig.json', 'apps/*/tsconfig.app.json', 'libs/*/tsconfig.app.json'],
            },
            node: {
                project: ['tsconfig.json', 'apps/*/tsconfig.app.json', 'libs/*/tsconfig.app.json'],
            },
        },
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // TS rules
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        // SonarJS rules
        'sonarjs/no-nested-template-literals': 'warn',
        // Quotes
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        // Code Style
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enumMember',
                format: null,
            },
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    // Index signature
                    // No accessibility for index signature. See above.

                    // Fields
                    'public-field', // = ["public-static-field", "public-instance-field"]
                    'protected-field', // = ["protected-static-field", "protected-instance-field"]
                    'private-field', // = ["private-static-field", "private-instance-field"]

                    // Constructors
                    // Only the accessibility of constructors is configurable. See below.

                    // Methods
                    'public-method', // = ["public-static-method", "public-instance-method"]
                    'protected-method', // = ["protected-static-method", "protected-instance-method"]
                    'private-method', // = ["private-static-method", "private-instance-method"]
                ],
            },
        ],
        'prettier/prettier': ['error'],
        // ESLint rules
        'no-process-env': 'error',
        curly: ['error', 'all'],
        'prefer-object-spread': 'error',
        'object-shorthand': ['error', 'properties'],
        'no-param-reassign': 'error',
        'no-implicit-coercion': 'error',
        'no-lonely-if': 'error',
        'no-negated-condition': 'error',
        'no-throw-literal': 'error',
        'no-nested-ternary': 'error',
        'no-confusing-arrow': 'warn',
        radix: 'error',
        'max-depth': ['error', 3],
        // enforces return await
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'always'],
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
    },
};
