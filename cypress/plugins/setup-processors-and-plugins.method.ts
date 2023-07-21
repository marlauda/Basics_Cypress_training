import fs from 'fs';

import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import webpack from '@cypress/webpack-preprocessor';
import shell from 'shell-exec';

import { webpackConfig } from './webpack.config';

export const setupProcessorsAndPlugins: Cypress.ResolvedConfigOptions['setupNodeEvents'] = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config);

  on('task', {
    // based on recipe from https://docs.cypress.io/api/commands/task#Read-a-file-that-might-not-exist
    checkFileExists: (filename: string): boolean => {
      return fs.existsSync(filename);
    },
    // necessary to display logs in the console during cypress run, using simply console.log() is not displaying the log
    // ONLY FOR DEBUG PURPOSE
    displayLog: (log: string) => {
      console.log(log); // eslint-disable-line no-console
      return true;
    },
    getDockerEnvironmentVariable: (environmentVariable: string) => {
      return shell(`docker exec cypress printenv ${environmentVariable}`).then(({ code, stdout, stderr }): string => {
        // only throw an error if a real error occur, not if the variable is just not defined
        if (code !== 0 && (stdout !== '' || stderr !== '')) {
          throw new Error(`Failed to get environment variable ${environmentVariable}.\n Result: ${stdout}\n Error: ${stderr}`);
        }
        return stdout.trim();
      });
    },
  });

  // use a Webpack loader to process feature files (cucumber's files)
  const options = {
    webpackOptions: webpackConfig(config),
  };
  on('file:preprocessor', webpack(options));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
};
