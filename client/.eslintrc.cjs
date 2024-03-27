module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'plugin:react-hooks/recommended',
  ],
  plugins: [
    'react-refresh',
    'file-progress',
  ],
  settings: {
    react: { version: '18.2'},
    "import/resolver": {
      "node": {
        "paths": ["client/src"]
      },
      typescript: {},
    },
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
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
    'import/no-cycle': 1,

    'no-lone-blocks': 0, // This prevents jsx comments
    'react/jsx-props-no-spreading': 0, // Spreading makes passing props from model to view way less redundant
    'react/react-in-jsx-scope': 0, // no longer nessecary
    'react/prop-types': 0, // Proptypes don't really offer much value but consume a lot of time
    'import/prefer-default-export': 0, // Default exports require more refactoring when you want to add more exports
    'import/no-named-as-default': 0, // This is a bit too strict
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
