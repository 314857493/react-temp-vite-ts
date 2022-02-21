module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  globals: {},
  plugins: ["react-hooks"],
  rules: {
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "no-unused-expressions": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
