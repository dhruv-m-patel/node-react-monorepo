module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/indent': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: [
        'airbnb-base',
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
      },
      plugins: ['@babel'],
    },
  ],
  rules: {
    'import/prefer-default-export': [0],
    'import/order': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': [2, {
      props: false,
    }],
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
  },
};
