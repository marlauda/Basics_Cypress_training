@solution
Feature: Solution to the exercises

  # visit
  Background:
    Given I navigate to "commands/actions" page
    
  # get using tag + assertion using invoke
  @exercise_1
  Scenario: [exercise_1] validates page title

    Then I validate that the page title is "Actions"

  # get using attribute value + get using text + type + click + assertion using contains
  @exercise_2
  Scenario: [exercise_2] fill and submit form

    When I submit "test" coupon code
    Then I validate the form is submitted successfully
    