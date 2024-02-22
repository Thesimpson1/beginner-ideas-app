module.exports = {
  root: true,
  env: {
    jest: true,
  },

  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // 'plugin:eslint-comments/recommended',
  ],
  plugins: ['prettier', 'import', 'simple-import-sort', 'beginner-apps'],
  rules: {
    // custom beginner-apps rules which will throw errors
    'beginner-apps/styled-components-naming': 2,
    'beginner-apps/prevent-unused-imports': 2,

    // community provided rules marked as errors
    'react-hooks/exhaustive-deps': 2,
    'eslint-comments/no-unlimited-disable': 0,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-explicit-any': 2,
    'prettier/prettier': 2,
    '@typescript-eslint/no-shadow': 2,
    'react-native/no-inline-styles': 2,
    curly: 2,
    quotes: 2,
    'no-console': 2,

    // disabled community provided rules
    'import/no-named-as-default-member': 0,
    'import/default': 0,
    'import/namespace': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,

    // import rules related settings
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` related packages come first.
          // Absolute imports and other imports such as Vue-style `@/foo`.
          ['^react', '^@?\\w'],
          // Internal packages.
          // Anything that does not start with a dot.
          [
            '^(app/assets)(/.*|$)',
            '^(app/api)(/.*|$)',
            '^(app/models)(/.*|$)',
            '^(app/hooks)(/.*|$)',
            '^(app/utils)(/.*|$)',
            '^(app/components)(/.*|$)',
            '^(app/navigation)(/.*|$)',
            '^(app/constants)(/.*|$)',
            '^(app/screens)(/.*|$)',
            '^(app/services)(/.*|$)',
            '^(app/utils)(/.*|$)',
            '^[^.]',
          ],
          ['^\\.'],
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['**/*.spec.*', '**/testHelpers.*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/types/gql-types/*.*', '**/types/gql-global-types.ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'eslint-comments/no-unused-disable': 'off',
      },
    },
  ],
};
