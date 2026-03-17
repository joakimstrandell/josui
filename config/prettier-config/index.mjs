/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  overrides: [
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};

export default config;
