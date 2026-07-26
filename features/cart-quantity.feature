Feature: Cart quantity validation
  As a GreenCart customer
  I want product quantities to follow purchasing rules
  So that my cart can be processed safely

  Background:
    Given product stock is 10 units

  Scenario: Add a valid quantity to the cart
    When the customer validates quantity 5
    Then the quantity validation should succeed
    And the accepted quantity should be 5

  Scenario: Reject quantity written as text
    When the customer validates quantity "two"
    Then the quantity validation should fail with code "QUANTITY_TYPE"

  Scenario: Reject a fractional quantity
    When the customer validates fractional quantity 1.5
    Then the quantity validation should fail with code "QUANTITY_INTEGER"

  Scenario Outline: Validate quantity boundaries
    When the customer validates quantity <quantity>
    Then the validation outcome should be "<outcome>" with code "<code>"

    Examples:
      | quantity | outcome | code         |
      | 1        | valid   | NONE         |
      | 10       | valid   | NONE         |
      | 0        | invalid | QUANTITY_MIN |
      | 11       | invalid | QUANTITY_MAX |

  Scenario: Reject quantity exceeding available stock
    Given product stock is 3 units
    When the customer validates quantity 4
    Then the quantity validation should fail with code "QUANTITY_STOCK"
