const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "downloadsFolder": "cypress/downloads",
    "baseUrl": 'https://app.levo.in.net',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
