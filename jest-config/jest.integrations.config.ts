// eslint-disable-next-line import/no-extraneous-dependencies
import { type Config } from 'jest';
import defaultConfig from '../jest.config';

const config: Config = {
  displayName: 'Integration tests',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest-config/jest.integrations.setup.ts'],
  globalSetup: '<rootDir>/jest-config/jest.integrations.global.setup.ts',
  globalTeardown: '<rootDir>/jest-config/jest.integrations.global.teardown.ts',
  testMatch: ['<rootDir>/src/tests/integrations/**/*.ts'],
  moduleNameMapper: defaultConfig.moduleNameMapper,
  coveragePathIgnorePatterns: defaultConfig.coveragePathIgnorePatterns,
  coverageThreshold: defaultConfig.coverageThreshold,
  rootDir: '../',
};

export default config;
