module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "max-len": ["warn", 200],
    "linebreak-style": 0,
    "arrow-parens": ["error", "always"],
    // This is required to have correct error handlers in Express
    "no-unused-vars": ["error", {"argsIgnorePattern": "next"}],
    // Knex needs snake_case for object properties
    "camelcase": ["warn", {properties: "never"}],
    "no-empty-pattern": "off",
  }
};
