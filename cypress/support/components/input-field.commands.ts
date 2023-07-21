import { getNewAlias } from '../_common';

Cypress.Commands.add('asInputField', { prevSubject: 'element' }, (inputField: JQuery): App.IInputFieldCommands<JQuery> => {
  return cy.wrap(inputField) as App.IInputFieldCommands<JQuery>;
});

Cypress.Commands.add(
  // @ts-ignore: Consistent with the commands dispatch in different namespace
  'editInputField',
  { prevSubject: 'element' },
  (inputField: JQuery, text: string, options?: { clear?: boolean; force?: boolean }): void => {
    const { force, clear } = options ?? {};
    const inputFieldAlias = getNewAlias('inputField');

    cy.wrap(inputField).as(inputFieldAlias.name);

    if (clear) {
      cy.get(inputFieldAlias.key).clear({ force });
    }

    cy.get(inputFieldAlias.key).type(text, { force });
  },
);

// Declare new commands signature for Typescript resolution
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable<Subject> {
      asInputField(): App.IInputFieldCommands<JQuery>;
    }
  }

  namespace App {
    interface IInputFieldCommands<Subject> extends Cypress.Chainable<Subject> {
      editInputField(text: string, options?: { clear?: boolean; force?: boolean }): void;
    }
  }
}
