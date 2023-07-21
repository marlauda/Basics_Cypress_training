import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { ErrorTestExecution, featureStepWithArg, featureStepWithArgs, throwIfNotInEnumValue } from '../../_common';
import { ENavigationPageIdentifiers } from '../../navigation';
import { ECouponCodes } from './coupon-codes.enum';
import { CouponSubmitParameters, NavigationParameters } from './step-arguments';

interface ICouponStatus {
  couponCode: ECouponCodes;
  status: string;
}

Given(
  'I navigate to the {word} page',
  featureStepWithArg(NavigationParameters, (navigationParameters, page: ENavigationPageIdentifiers) => {
    throwIfNotInEnumValue(page, ENavigationPageIdentifiers);

    cy.navigateToPage(page, navigationParameters.module);
  }),
);

Then('I validate the current page title', () => {
  cy.getCurrentNavigationPage().then(({ title }) => {
    cy.get('h1').invoke('text').should('be.equal', title);
  });
});

When(
  'I submit coupons code',
  featureStepWithArgs(CouponSubmitParameters, couponSubmitParameters => {
    couponSubmitParameters.forEach(({ couponCode }) => {
      cy.get('input[id="couponCode1"]').asInputField().editInputField(couponCode, { clear: true });
      cy.submitForm();
    });
  }),
);

Then(
  'I validate the coupons are submitted successfully',
  featureStepWithArgs(CouponSubmitParameters, couponSubmitParameters => {
    cy.get('label[for="couponCode1"]')
      .parents('form')
      .parent()
      .then(formContainer => {
        const expectedSuccessLabel = 'Your form has been submitted!';
        const submitCouponStatus: ICouponStatus[] = formContainer
          .find('p')
          .toArray()
          .map((label, index) => ({
            couponCode: couponSubmitParameters[index].couponCode,
            status: label.textContent?.trim() ?? '',
          }));
        const notMatchingCouponStatus: ICouponStatus[] = submitCouponStatus.filter(({ status }) => status !== expectedSuccessLabel);

        if (notMatchingCouponStatus.length) {
          const formattedNotMatchingCouponStatus = notMatchingCouponStatus
            .map(({ couponCode, status }) => `Coupon Code : "${couponCode}", Status : "${status}"`)
            .join('\n');
          throw new ErrorTestExecution({
            cause: `Some coupons generated a status different from "${expectedSuccessLabel}".`,
            debugHint: formattedNotMatchingCouponStatus,
          });
        }

        if (submitCouponStatus.length !== couponSubmitParameters.length) {
          throw new ErrorTestExecution({
            cause: 'Some coupons generated not status at all',
            debugHint: `Submitted number of coupons : ${couponSubmitParameters.length}, Number of status : ${submitCouponStatus.length}`,
          });
        }
      });
  }),
);
