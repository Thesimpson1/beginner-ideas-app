module.exports = {
  preset: 'react-native',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
  ],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/svgTransform.js',
  },
  collectCoverageFrom: [
    'app/**/*.{js,ts,jsx,tsx}',
    '!app/redux/store.ts',
    '!app/**/index.ts',
    '!app/**/types.{ts,tsx}',
    '!app/**/*.types.{ts,tsx}',
    '!app/**/*.styled.{ts,tsx}',
    '!app/**/*.constants.{ts,tsx}',
    '!app/types/**',
    '!app/App.tsx',
    '!app/assets/**',
    '!app/**/*.providers.tsx',
    '!app/**/*.navigator.tsx',
    '!app/**/rootNavigation.ts',
    '!app/**/utils/test-utils/**',
    '!app/api/**',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
