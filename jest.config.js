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
    '@sackrin/organic-core': '<rootDir>packages/organic-core/src',
    '@sackrin/organic-root': '<rootDir>packages/organic-root/src',
    '@sackrin/organic-property': '<rootDir>packages/organic-property/src',
    '@sackrin/organic-children': '<rootDir>packages/organic-children/src',
    '@sackrin/organic-collection': '<rootDir>packages/organic-collection/src',
    '@sackrin/organic-container': '<rootDir>packages/organic-container/src',
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
