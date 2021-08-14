const baseConfig = require('./jest.config.base');

module.exports = {
  ...baseConfig,
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/services/*/jest.config.js',
    '<rootDir>/apps/*/jest.config.js',
  ],
  roots: ['<rootDir>/packages', '<rootDir>/services', '<rootDir>/apps'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    'services/**/*.{js,jsx,ts,tsx}',
    'apps/**/*.{js,jsx,ts,tsx}',
  ],
  moduleDirectories: ['node_modules'],
};
