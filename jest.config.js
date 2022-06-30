module.exports = {
  verbose: false,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(?:t|j)sx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
  },
};
