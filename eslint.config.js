// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    // src/generate-i18n-structure.js es un script suelto de Node (usa __dirname),
    // no forma parte de la app.
    ignores: ['dist/*', '.expo/*', 'node_modules/*', 'src/generate-i18n-structure.js'],
  },
]);
