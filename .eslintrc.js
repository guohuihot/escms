// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "vue/html-indent": ["error", 4, {
          "attribute": 1,
          "baseIndent": 1,
          "closeBracket": 0,
          "alignAttributesVertically": true,
          "ignores": []
    }],
    // "vue/component-name-in-template-casing": ["error", "PascalCase", { registeredComponentsOnly: true }],
    // don't require .vue extension when importing
    /*'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],*/
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    /*'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],*/
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [2, 4],//缩进风格
    'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空格
    'key-spacing': [0, { beforeColon: false, afterColon: true }],//对象字面量中冒号的前后空格
    'no-multi-spaces': 0,//不能用多余的空格
    'comma-dangle': 0,//对象字面量项尾不能有逗号
    'spaced-comment': 0, // 注释内有空格或者缩进
    'eqeqeq': 0,

    'no-await-in-loop': 1,
    'no-cond-assign': 1,
    'no-dupe-args': 1,
    'no-empty': 1,
    'no-extra-boolean-cast': 1,
    'no-extra-parens': 1, //禁止不必要的括号
    'no-extra-semi': 1, //禁止不必要的分号
    'no-inner-declarations': 1, //禁止不必要的分号
    'no-irregular-whitespace': 1, //禁止不规则的空白
    'no-prototype-builtins': 1,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 1,
    'no-template-curly-in-string': 1,
    'no-unexpected-multiline': 1,
    'no-unreachable': 1,
    'no-unsafe-negation': 1,
    'use-isnan': 1,
    // 'require-atomic-updates': 1,
    'valid-typeof': 1,

    'curly': 1,
    'complexity': 1,
    'dot-location': 1,
    'dot-notation': 1,
    'no-div-regex': 1,
    'no-else-return': 1,
    'no-empty-function': 1,
    'no-empty-pattern': 1,
    'no-eq-null': 1,
    'no-eval': 1,
    'no-extra-bind': 1,
    'no-extra-label': 1,
    'no-fallthrough': 1,
    'no-global-assign': 1,
    'no-implicit-globals': 1,
    'no-invalid-this': 1,
    'no-labels': 1,
    'no-lone-blocks': 1,
    'no-loop-func': 1,
    'no-magic-numbers': 0,
    'no-new': 1,
    'no-new-wrappers': 1,
    'no-octal': 1,
    'no-redeclare': 1,
    'no-restricted-properties': 1,
    'no-return-assign': 1,
    'no-self-assign': 1,
    'no-self-compare': 1,
    'no-sequences': 1,
    'no-unmodified-loop-condition': 1,
    'no-unused-expressions': 1,
    // 'no-useless-catch': 1,
    'no-unused-labels': 1,
    'no-useless-escape': 1,
    'no-useless-return': 1,
    'no-warning-comments': 1,
    'no-with': 1,
    'prefer-promise-reject-errors': 1,
    'require-await': 1,
    'vars-on-top': 1,
    'wrap-iife': 1,
    'no-undef': 1,
    'no-undef-init': 1,
    'no-unused-vars': 1,
    'no-use-before-define': 1,

    'array-bracket-newline': 1,
    'array-bracket-spacing': 1,
    'array-element-newline': 1,
    'block-spacing': 1,
    'brace-style': 1,
    'comma-style': ["error", "last"],
    'func-call-spacing': ["error", "never"],
    'implicit-arrow-linebreak': ["error", "beside"],
    'jsx-quotes': ["error", "prefer-single"],
    'max-len': ["error", { "code": 120, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreStrings": true, "ignoreTemplateLiterals": true }],
    'max-nested-callbacks': ["error", 4],
    'no-mixed-spaces-and-tabs': "error",
    'no-var': "error",
    'prefer-template': "error",
    'camelcase': ["error", {properties: "never"}]
    // 'object-curly-spacing': ["error", "never"]

  },
  globals: {
    platform: true,
    platformApi: true,
    platformTag: true,
  },
}
