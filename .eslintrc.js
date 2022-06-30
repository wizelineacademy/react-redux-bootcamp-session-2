module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
  },
  env: {
    webextensions: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react-hooks'],
  rules: {
    'max-len': ['error', { code: 100 }],
    'dot-notation': 'error',
    quotes: ['error', 'single'],
    'no-await-in-loop': 'error',
    'no-param-reassign': 'error',
    'no-restricted-exports': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/self-closing-comp': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    '@typescript-eslint/default-param-last': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-console': 'off',
    'require-yield': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
