import { cartPage } from '../pages/CartPage';
import { loginPage } from '../pages/LoginPage';
import { productsPage } from '../pages/ProductsPage';

describe('GreenCart cart', () => {
  beforeEach(() => {
    loginPage.loginSuccessfully('customer', 'Customer123!');
    cartPage.visit().clearAllItems();
    productsPage.addFirstProductToCart();
  });

  it('menambahkan produk ke keranjang', () => {
    cartPage.visit().assertHasItems();
    cy.contains('1 item').should('be.visible');
  });

  it('mengubah jumlah produk dalam keranjang', () => {
    cartPage.visit().assertHasItems().increaseFirstItem();
    cy.contains('2 item').should('be.visible');
  });

  it('menghapus produk dari keranjang', () => {
    cartPage.visit().assertHasItems().removeFirstItem();
    cy.contains('Keranjang masih kosong').should('be.visible');
  });
});
