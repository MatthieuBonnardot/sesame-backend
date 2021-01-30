module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 0,
  },
};
