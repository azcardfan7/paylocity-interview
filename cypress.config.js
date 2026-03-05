const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
