export {};

Cypress.Commands.add('submitForm', (force?: boolean): void => {
  Cypress.log({ displayName: 'Submit' });

  cy.get('button[type="submit"]', { log: false }).click({
    force,
  });
});

// Declare new commands signature for Typescript resolution
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable<Subject> {
      submitForm(forceClick?: boolean): Chainable<void>;
    }
  }
}
