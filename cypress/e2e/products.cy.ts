import { productsPage } from '../pages/ProductsPage';

describe('GreenCart products', () => {
  it('menampilkan daftar produk dan hasil pencarian', () => {
    productsPage.visit().assertLoaded().search('Monstera');
    cy.contains('Monstera Deliciosa').should('be.visible');
    cy.contains('1 produk ditemukan').should('be.visible');
  });
});
