import { defineConfig } from 'cypress';

import { setupProcessorsAndPlugins } from './cypress/plugins/setup-processors-and-plugins.method';

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 8_000,
  responseTimeout: 50_000,
  execTimeout: 120_000,
  retries: {
    runMode: 0,
    openMode: 0,
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: './reports/mochawesome/',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
      code: false,
    },
  },

  screenshotsFolder: 'reports/screenshots',

  videosFolder: 'reports/videos',
  video: false,

  viewportWidth: 1366,
  viewportHeight: 768,

  watchForFileChanges: false,

  e2e: {
    baseUrl: 'https://example.cypress.io',
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/integration/**/*.feature',

    setupNodeEvents: setupProcessorsAndPlugins,
    slowTestThreshold: 40000,
  },
});
