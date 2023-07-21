@solution
Feature: Solution to the exercises

  # visit
  Background:
    Given I navigate to the Actions page
      | module   |
      | commands |
    
  # get using tag + assertion using invoke
  @exercise_1
  Scenario: [exercise_1] validates page title

    Then I validate the current page title

  # get using attribute value + get using text + type + click + assertion using contains
  @exercise_2
  Scenario: [exercise_2] fill and submit form

    When I submit coupons code
      | couponCode |
      | test1      |
      | test2      |
      | test3      |
    Then I validate the coupons are submitted successfully
      | couponCode |
      | test1      |
      | test2      |
      | test3      |
    