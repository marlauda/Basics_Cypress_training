import { ErrorTestExecution } from '../_common';
import { ENavigationModules } from './navigation-modules.enum';
import { INavigationPageFixture } from './navigation-page-fixture.interface';
import { ENavigationPageIdentifiers } from './navigation-page-identifiers.enum';

let currentNavigationPage: INavigationPageFixture;

Cypress.Commands.add('getCurrentNavigationPage', (): Cypress.Chainable<INavigationPageFixture> => {
  if (!currentNavigationPage) {
    throw new ErrorTestExecution({
      cause: 'The test try an action specific to the current screen, but it is not defined.',
      debugHint: 'Please use a page navigation method first.',
    });
  }

  return cy.wrap(currentNavigationPage);
});

Cypress.Commands.add(
  'navigateToPage',
  (navigationPageIdentifier: ENavigationPageIdentifiers, navigationModule: ENavigationModules): void => {
    cy.getNavigationPage(navigationPageIdentifier).then(navigationPage => {
      cy.visit(`${navigationModule}/${navigationPage.path}`);

      currentNavigationPage = navigationPage;
    });
  },
);

// Declare new commands signature for Typescript resolution
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable<Subject> {
      getCurrentNavigationPage(): Cypress.Chainable<INavigationPageFixture>;

      navigateToPage(navigationPageIdentifier: ENavigationPageIdentifiers, navigationModule: ENavigationModules): void;
    }
  }
}
