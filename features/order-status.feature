Feature: Order status transition
  As a GreenCart administrator
  I want order status changes to follow the workflow
  So that completed or cancelled orders cannot be reactivated

  Scenario Outline: Allow valid order status transitions
    Given an order currently has status "<current>"
    When the administrator changes the status to "<target>"
    Then the order status transition should succeed to "<target>"

    Examples:
      | current   | target    |
      | DRAFT     | CONFIRMED |
      | DRAFT     | CANCELLED |
      | CONFIRMED | COMPLETED |
      | CONFIRMED | CANCELLED |

  Scenario: Reject cancellation of a completed order
    Given an order currently has status "COMPLETED"
    When the administrator changes the status to "CANCELLED"
    Then the order status transition should fail with code "INVALID_STATUS_TRANSITION"
    And the order should remain in status "COMPLETED"

  Scenario: Reject reactivation of a cancelled order
    Given an order currently has status "CANCELLED"
    When the administrator changes the status to "DRAFT"
    Then the order status transition should fail with code "INVALID_STATUS_TRANSITION"
    And the order should remain in status "CANCELLED"

  Scenario: Reject a status change to the current status
    Given an order currently has status "CONFIRMED"
    When the administrator changes the status to "CONFIRMED"
    Then the order status transition should fail with code "STATUS_UNCHANGED"
    And the order should remain in status "CONFIRMED"
