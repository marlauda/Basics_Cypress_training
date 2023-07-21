import { ErrorTestExecution } from '../_common';
import { INavigationPageFixture } from './navigation-page-fixture.interface';
import { ENavigationPageIdentifiers } from './navigation-page-identifiers.enum';

Cypress.Commands.add(
  'getNavigationPage',
  (navigationPageIdentifier: ENavigationPageIdentifiers): Cypress.Chainable<INavigationPageFixture> => {
    const fixtureFileName = 'navigation.json';

    return cy.fixture(fixtureFileName).then((navigationPageFixtures: INavigationPageFixture[]): INavigationPageFixture => {
      const matchingNavigationPage = navigationPageFixtures.find(({ identifier }) => identifier === navigationPageIdentifier);

      if (matchingNavigationPage) {
        return matchingNavigationPage;
      }

      throw new ErrorTestExecution({
        cause: `The navigation page ${navigationPageIdentifier} is not present in the ${fixtureFileName} file.`,
        debugHint: `Available navigation pages : ${navigationPageFixtures.map(({ identifier }) => identifier).join('|')}`,
      });
    });
  },
);

// Declare new commands signature for Typescript resolution
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable<Subject> {
      getNavigationPage(navigationPageIdentifier: ENavigationPageIdentifiers): Cypress.Chainable<INavigationPageFixture>;
    }
  }
}
