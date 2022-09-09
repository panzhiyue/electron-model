export default {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    indent: ['error', 'tab'], //使用tab缩进
    'linebreak-style': ['error', 'windows'], //换行样式
    quotes: ['error', 'single'], //单引号
    semi: ['error', 'always'], //分号
    'vue/no-multiple-template-root': 'off'
  }
}
