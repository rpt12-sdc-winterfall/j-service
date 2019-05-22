/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: "airbnb",
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "react/react-in-jsx-scope": "off"
  },
  env: {
    'browser': true,
    'node': true,
    'jest': true,
  },
  "globals": {
    "React": "readonly",
    "ReactDOM": "readonly",
    "styled": "readonly",
  },
};