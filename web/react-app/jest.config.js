const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ['/node_modules/', path.join(__dirname, 'build')],
  testEnvironment: 'jsdom',
  testMatch: [
    path.join(__dirname, 'src/**/*.test.{js,jsx,ts,tsx}'),
    path.join(__dirname, 'tests/**/*.test.{js,jsx,ts,tsx}'),
  ],
  setupFilesAfterEnv: [path.join(__dirname, 'src/setupTests.ts')],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest.mock.js',
    '\\.svg$': '<rootDir>/jest.mock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
