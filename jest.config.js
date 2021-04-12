module.exports = {
  rootDir: __dirname,
  collectCoverageFrom: ['packages/**/*.{js,ts,tsx}', '!**/*-test.{js,ts,tsx}'],
  projects: ['<rootDir>/packages/*/jest.config.js'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest.mock.js',
  },
  clearMocks: true,
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
