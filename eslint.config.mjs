import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx,js,jsx,cjs}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "es5",
          endOfLine: "auto",
          printWidth: 120,
        },
      ],
      "import/prefer-default-export": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@|components)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "react/react-in-jsx-scope": "off",
      "no-param-reassign": "off",
      "simple-import-sort/exports": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-restricted-types": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "no-plusplus": "off",
      "no-case-declarations": "off",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
