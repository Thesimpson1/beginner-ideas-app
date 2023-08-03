module.exports = {
  preset: 'react-native',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
  ],
};
