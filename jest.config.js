module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    'ts-jest': {
      extends: './babel.config.js',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ['lib'],
  moduleNameMapper: {
    '@sackrin/organic-assert': '<rootDir>packages/organic-assert/src',
    '@sackrin/organic-condition': '<rootDir>packages/organic-condition/src',
    '@sackrin/organic-property': '<rootDir>packages/organic-property/src',
    '@sackrin/organic-validator': '<rootDir>packages/organic-validator/src',
  },
  notify: true,
  notifyMode: 'always',
  roots: ['<rootDir>packages'],
  testMatch: ['**/__tests__/*.+(ts|js)', '**/*.test.+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>jest/setupTests.ts'],
};
