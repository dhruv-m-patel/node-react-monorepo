const path = require('path');
const JestConfig = require('../../jest.config.base');

const { projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  rootDir: './src',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
