/* This config is shared among  tests environment */
import { type Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  detectOpenHandles: true,
  forceExit: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testSequencer: './jest-config/jest.sequencer.js',
  testPathIgnorePatterns: ['./build'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  coveragePathIgnorePatterns: [
    './src/scripts',
    './src/types',
    './src/loadEnv.ts',
    './src/server.ts',
    /* Ignore Oauth */
    './src/tests',
    './src/routes',
    './src/middlewares',
    './src/utils',
    './src/config',
    './src/constants',
    './src/models',
  ],
  // !Enable coverage threshold
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 60,
      lines: 50,
      statements: 50,
    },
  },
  projects: [
    '<rootDir>/jest-config/jest.unit.config.ts',
    '<rootDir>/jest-config/jest.integrations.config.ts',
  ],
};

export default config;
