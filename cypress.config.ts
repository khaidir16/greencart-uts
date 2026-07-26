import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  allowCypressEnv: false,
  retries: { runMode: 1, openMode: 0 },
});
