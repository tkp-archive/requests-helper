const globals = require("globals");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tslintPlugin = require("@typescript-eslint/eslint-plugin-tslint");
const legacyConfig = require("./.eslintrc.js");

const rules = {
  ...legacyConfig.rules,
  indent: legacyConfig.rules["@typescript-eslint/indent"],
  quotes: legacyConfig.rules["@typescript-eslint/quotes"],
  semi: legacyConfig.rules["@typescript-eslint/semi"],
};

delete rules["@typescript-eslint/ban-types"];
delete rules["@typescript-eslint/camelcase"];
delete rules["@typescript-eslint/indent"];
delete rules["@typescript-eslint/member-delimiter-style"];
delete rules["@typescript-eslint/no-parameter-properties"];
delete rules["@typescript-eslint/quotes"];
delete rules["@typescript-eslint/semi"];

module.exports = [
  {
    ignores: ["**/*.js"],
  },
  ...tsPlugin.configs["flat/recommended-type-checked"],
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        createDefaultProgram: true,
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2015,
      },
    },
    plugins: {
      "@typescript-eslint/tslint": tslintPlugin,
    },
    rules,
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
