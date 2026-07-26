export class ProductsPage {
  visit() {
    cy.visit('/products');
    return this;
  }

  assertLoaded() {
    cy.contains(/\d+ produk ditemukan/).should('be.visible');
    cy.get('a[aria-label^="Lihat "]').should('have.length.at.least', 1);
    return this;
  }

  search(term: string) {
    cy.get('input[aria-label="Cari produk"]').clear().type(term);
    cy.contains('button', 'Cari').click();
    return this;
  }

  openFirstProduct() {
    cy.get('a[aria-label^="Lihat "]').first().click();
    cy.contains('button', 'Tambah ke keranjang').should('be.visible');
    return this;
  }

  addCurrentProductToCart() {
    cy.contains('button', 'Tambah ke keranjang').click();
    cy.get('[role="status"]').should('contain.text', 'ditambahkan');
    return this;
  }

  addFirstProductToCart() {
    return this.visit().assertLoaded().openFirstProduct().addCurrentProductToCart();
  }
}

export const productsPage = new ProductsPage();
