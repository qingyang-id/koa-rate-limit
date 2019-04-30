module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    camelcase: 0,
    'max-len': [
      'error',
      {
        // 代码长度
        code: 150,
        // 忽略正则表达式匹配的行；可以只匹配单行，而且在 YAML 或 JSON 中需要双重转义
        // ignorePattern: true,
        // 忽略所有拖尾注释和行内注释
        ignoreComments: true,
        // 强制注释的最大长度；默认长度同 code, 暂未生效,因此加入上方的规则
        comments: 120
      }
    ],
    'func-names': [
      "warn",
      "never"
    ],
    // 'no-underscore-dangle': [
    //   "error",
    //   {
    //     "allow": [
    //       '_id',
    //       '_json',
    //       '__channelService__'
    //     ]
    //   }
    // ],
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'global-require': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    // 'no-continue': 0,
    'object-curly-newline': 0,
    // 'no-restricted-syntax': ['error', 'BinaryExpression[operator="in"]'],
    // 'prefer-destructuring': 0,
    // 'no-mixed-operators': ['error', { 'allowSamePrecedence': true }]
    'operator-linebreak': ['error', 'after']
  },
};
