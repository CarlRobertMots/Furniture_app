Feature: Add Product to Favourites
  As a logged-in user, I want to add a product to my favourites
  and see it on my favourites list.

  Background: User is logged in
    Given I am on the sign in page
    When I enter "ye@ye.ye" into the email field
    And I enter "12341234" into the password field
    And I click the "Sign In" button
    Then I should be navigated to the "home" page

  Scenario: User favourites a Popular product and checks the list
    When I click on the first product in the list 
    And I save the name of the product on the detail page
    And I click the product favourite button
    And I click the back button
    