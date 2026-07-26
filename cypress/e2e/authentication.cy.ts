import { loginPage } from '../pages/LoginPage';

describe('GreenCart authentication', () => {
  it('menolak kredensial yang salah', () => {
    loginPage.login('customer', 'password-salah');
    loginPage.assertServerError('Email/username atau password salah.');
  });

  it('menampilkan validasi ketika field login kosong', () => {
    loginPage.submitEmpty();
    loginPage.assertFieldErrors();
  });

  it('mengarahkan Customer ke katalog setelah login valid', () => {
    loginPage.loginSuccessfully('customer', 'Customer123!');
    cy.location('pathname').should('eq', '/products');
    cy.contains(/\d+ produk ditemukan/).should('be.visible');
  });
});
