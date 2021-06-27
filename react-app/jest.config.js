const path = require('path');

module.exports = {
  verbose: false,
  rootDir: './src',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: [path.resolve(__dirname, './jest.setup.js')],
};
