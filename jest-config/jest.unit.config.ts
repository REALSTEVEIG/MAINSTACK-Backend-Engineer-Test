// eslint-disable-next-line import/no-extraneous-dependencies
import { type Config } from 'jest';
import defaultConfig from '../jest.config';

const config: Config = {
  displayName: 'Unit tests',
  preset: 'ts-jest',
  globalSetup: undefined,
  globalTeardown: undefined,
  setupFilesAfterEnv: ['<rootDir>/jest-config/jest.unit.setup.ts'],
  testMatch: ['<rootDir>/src/tests/unit/**/*.ts'],
  moduleNameMapper: defaultConfig.moduleNameMapper,
  coveragePathIgnorePatterns: defaultConfig.coveragePathIgnorePatterns,
  coverageThreshold: defaultConfig.coverageThreshold,
  rootDir: '../',
};

export default config;
