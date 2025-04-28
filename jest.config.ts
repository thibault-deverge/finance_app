import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/navigation$': '<rootDir>/test/__mocks__/next/navigation.ts',
  },
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
};

export default createJestConfig(config);
