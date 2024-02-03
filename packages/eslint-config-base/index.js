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
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: [
        'airbnb-base',
      ],
      parser: '@babel/eslint-parser',
      plugins: ['@babel'],
    }
  ],
  rules: {
    'import/prefer-default-export': [0],
    'no-param-reassign': [2, {
      props: false,
    }],
  },
};
