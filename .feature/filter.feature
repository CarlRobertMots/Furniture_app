Feature: Filter Debugging

  Background: User is logged in
    Given I am on the sign in page
    When I enter "ye@ye.ye" into the email field
    And I enter "12341234" into the password field
    And I click the "Sign In" button
    Then I should be navigated to the "home" page

  Scenario: Filter by Armchair and show results
    When I click on the "Armchair" category filter
    Then I log the visible products to the console