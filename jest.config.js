module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov'],
    roots: ['<rootDir>/tests'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    setupFiles: ['react-app-polyfill/jsdom'],
    testMatch: ['<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
    modulePaths: [],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
};
