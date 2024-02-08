module.exports = {
  extends: [
    '@dhruv-m-patel/eslint-config-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  rules: {
    'arrow-parens': 'off',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'no-restricted-exports': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'default-param-last': 'off',
  },
  overrides: [
    // Overrides for typescript based react projects
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        '@dhruv-m-patel/eslint-config-base',
        'plugin:react/recommended',
        'plugin:storybook/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'react-hooks'],
    },
    // Overrides for javascript based react projects
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: [
        '@dhruv-m-patel/eslint-config-base',
        'plugin:react/recommended',
        'plugin:storybook/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@babel/eslint-parser',
      plugins: ['@babel', 'react-hooks'],
    },
    // Overrides for stories and tests
    {
      files: [
        '*.stories.js',
        '*.stories.jsx',
        '*.stories.ts',
        '*.stories.tsx',
        '*.test.js',
        '*.test.jsx',
        '*.test.ts',
        '*.test.tsx',
      ],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
