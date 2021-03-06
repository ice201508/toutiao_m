module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-loop-func': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'import/newline-after-import': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'prefer-arrow-callback': 0,
    'space-before-function-paren': 0,
    'func-names': 0,
    'comma-dangle': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'prefer-const': 0,
    'prefer-promise-reject-errors': 0,
    eqeqeq: 0,
    'vue/no-unused-components': 0,
    'spaced-comment': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    camelcase: 0,
    'no-empty': 0,
    'object-shorthand': 0,
    'prefer-template': 0,
    'operator-linebreak': 0,
    'array-callback-return': 0,
    'import/extensions': 0,
    semi: 2
  }
};
