const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ['node_modules', 'build', '../../packages'],
  testEnvironment: 'node',
  testMatch: [path.join(__dirname, 'tests/**/*.test.ts')],
};
