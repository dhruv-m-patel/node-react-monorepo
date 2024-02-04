module.exports = {
  extends: '@dhruv-m-patel/eslint-config-base',
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
    {
      extends: [
        '@dhruv-m-patel/eslint-config-base',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['react-hooks'],
      files: [
        'jest-setup.js',
        '*.stories.js',
        '*.stories.jsx',
        '*.test.js',
        '*.test.jsx',
        'src/addons/**',
        'webpack.config.js',
      ],
    },
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
