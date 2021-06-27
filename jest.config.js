const baseConfig = require('./jest.config.base');

module.exports = {
  ...baseConfig,
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/microservices/*/jest.config.js',
    '<rootDir>/react-app/jest.config.js',
  ],
  roots: [
    '<rootDir>/packages',
    '<rootDir>/microservices',
    '<rootDir>/react-app',
  ],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    'microservices/**/*.{js,jsx,ts,tsx}',
    'react-app/**/*.{js,jsx,ts,tsx}',
  ],
  moduleDirectories: ['node_modules'],
};
