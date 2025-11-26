Feature: User Login
  As a user, I want to log in to the web app

  Scenario: User logs in with valid credentials
    Given I am on the sign in page
    When I enter "ye@ye.ye" into the email field
    And I enter "12341234" into the password field
    And I click the "Sign In" button
    Then I should be navigated to the "home" page