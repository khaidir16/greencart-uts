import { Given, Then, When, setWorldConstructor } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import {
  validateCartQuantity,
  type CartQuantityResult,
} from '../../apps/api/src/modules/cart/domain/validateCartQuantity.ts';
import {
  transitionOrderStatus,
  type OrderStatus,
  type OrderStatusTransitionResult,
} from '../../apps/api/src/modules/order/domain/transitionOrderStatus.ts';

class GreenCartWorld {
  stock = 0;
  quantityResult?: CartQuantityResult;
  currentStatus?: OrderStatus;
  statusResult?: OrderStatusTransitionResult;
}

setWorldConstructor(GreenCartWorld);

Given('product stock is {int} units', function (this: GreenCartWorld, stock: number) {
  this.stock = stock;
});

When('the customer validates quantity {int}', function (this: GreenCartWorld, quantity: number) {
  this.quantityResult = validateCartQuantity(quantity, this.stock);
});

When(
  'the customer validates fractional quantity {float}',
  function (this: GreenCartWorld, quantity: number) {
    this.quantityResult = validateCartQuantity(quantity, this.stock);
  },
);

When('the customer validates quantity {string}', function (this: GreenCartWorld, quantity: string) {
  this.quantityResult = validateCartQuantity(quantity, this.stock);
});

Then('the quantity validation should succeed', function (this: GreenCartWorld) {
  assert.equal(this.quantityResult?.valid, true);
});

Then('the accepted quantity should be {int}', function (this: GreenCartWorld, quantity: number) {
  assert.ok(this.quantityResult?.valid);
  assert.equal(this.quantityResult.value, quantity);
});

Then(
  'the quantity validation should fail with code {string}',
  function (this: GreenCartWorld, code: string) {
    assert.equal(this.quantityResult?.valid, false);
    if (this.quantityResult?.valid === false) assert.equal(this.quantityResult.code, code);
  },
);

Then(
  'the validation outcome should be {string} with code {string}',
  function (this: GreenCartWorld, outcome: string, code: string) {
    const shouldBeValid = outcome === 'valid';
    assert.equal(this.quantityResult?.valid, shouldBeValid);
    if (!shouldBeValid && this.quantityResult?.valid === false) {
      assert.equal(this.quantityResult.code, code);
    }
  },
);

Given(
  'an order currently has status {string}',
  function (this: GreenCartWorld, current: string) {
    this.currentStatus = asOrderStatus(current);
  },
);

When(
  'the administrator changes the status to {string}',
  function (this: GreenCartWorld, target: string) {
    assert.ok(this.currentStatus, 'Current order status must be provided.');
    this.statusResult = transitionOrderStatus(this.currentStatus, asOrderStatus(target));
  },
);

Then(
  'the order status transition should succeed to {string}',
  function (this: GreenCartWorld, target: string) {
    assert.equal(this.statusResult?.changed, true);
    if (this.statusResult?.changed) assert.equal(this.statusResult.to, target);
  },
);

Then(
  'the order status transition should fail with code {string}',
  function (this: GreenCartWorld, code: string) {
    assert.equal(this.statusResult?.changed, false);
    if (this.statusResult?.changed === false) assert.equal(this.statusResult.code, code);
  },
);

Then('the order should remain in status {string}', function (this: GreenCartWorld, status: string) {
  assert.equal(this.statusResult?.changed, false);
  if (this.statusResult?.changed === false) assert.equal(this.statusResult.from, status);
});

function asOrderStatus(value: string): OrderStatus {
  const statuses: readonly OrderStatus[] = ['DRAFT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  assert.ok(statuses.includes(value as OrderStatus), `Unknown order status: ${value}`);
  return value as OrderStatus;
}
