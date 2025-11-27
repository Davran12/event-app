import {dirname} from "path"
import {fileURLToPath} from "url"
import {FlatCompat} from "@eslint/eslintrc"
import pluginPrettier from "eslint-plugin-prettier"
import pluginImport from "eslint-plugin-import"
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "build",
      "dist",
      "public",
      "eslint.config.mjs",
    ],
  },
]
