module.exports = {
  root: true,
  extends: ['airbnb-base'],
  overrides: [
    // Overrides for typescript projects
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['airbnb-base', 'airbnb-typescript/base'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/comma-dangle': 'off',
      },
    },
    // Overrides for javascript projects
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['airbnb-base'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
      },
      plugins: ['@babel'],
    },
  ],
  // Common rules for js and ts projects
  rules: {
    'import/prefer-default-export': [0],
    'import/order': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
  },
};
