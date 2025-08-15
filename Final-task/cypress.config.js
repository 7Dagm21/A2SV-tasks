/**
 * Cypress Configuration
 * Configures Cypress for E2E testing of bookmark functionality
 */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Allow overriding baseUrl via CLI (--config baseUrl=...) or CYPRESS_baseUrl env
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:3001",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    // Only capture screenshots we explicitly take after successful flows
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      // Test environment variables
      apiUrl: "https://akil-backend.onrender.com",
      testUser: {
        email: "testuser@example.com",
        password: "testpassword123",
        name: "Test User",
      },
    },
  },
});
