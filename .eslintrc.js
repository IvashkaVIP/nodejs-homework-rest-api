module.exports = {
  plugins: ["jest"],

  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
