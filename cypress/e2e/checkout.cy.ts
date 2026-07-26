import { cartPage } from '../pages/CartPage';
import { checkoutPage } from '../pages/CheckoutPage';
import { loginPage } from '../pages/LoginPage';
import { productsPage } from '../pages/ProductsPage';

describe('GreenCart checkout', () => {
  beforeEach(() => {
    loginPage.loginSuccessfully('customer', 'Customer123!');
    cartPage.visit().clearAllItems();
    productsPage.addFirstProductToCart();
    cartPage.visit().proceedToCheckout();
  });

  it('menolak checkout menggunakan data penerima tidak valid', () => {
    checkoutPage.fill({ phone: '12', shippingAddress: 'Pendek' }).submit().assertValidationError();
  });

  it('membuat pesanan menggunakan data penerima valid', () => {
    checkoutPage
      .fill({ phone: '081234567890', shippingAddress: 'Jalan Cypress Nomor 15, Jakarta Selatan' })
      .submit()
      .assertOrderCreated();
  });
});
