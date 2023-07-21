import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I navigate to {string} page', (page: string) => {
  cy.visit(page);
});

Then('I validate that the page title is {string}', (title: string) => {
  cy.get('h1').invoke('text').should('be.equal', title);
});

When('I submit {string} coupon code', (couponCode: string) => {
  cy.get('input[id="couponCode1"]').type(couponCode);
  cy.get('button[type="submit"]').contains('Submit').click();
});

Then('I validate the form is submitted successfully', () => {
  cy.get('label[for="couponCode1"]')
    .parents('form')
    .next('p')
    .should('contains', /^\s*Your form has been submitted!\s*$/);
});
