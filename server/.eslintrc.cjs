module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    es2021: true,
  },
  plugins: [
    'file-progress',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#root', './server/src'],
        ],
        extensions: ['.js', '.json'],
      },
      typescript: {},
    },
  },
  rules: {
    'max-len': [2, {
      code: 200,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
    }],
    // Required for eslint-plugin-file-progress
    'file-progress/activate': 1,
    'linebreak-style': 'off',
    'import/prefer-default-export': 0, // Default exports require more refactoring when you want to add more exports
    'import/extensions': 0, // Not compatible with package.json imports
  },
};
