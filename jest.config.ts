export default {
  testPathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/node_modules'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};
