module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic', // Enable the new JSX Transform
          },
        },
      },
    }],
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1', // Adjust according to your alias configuration
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
