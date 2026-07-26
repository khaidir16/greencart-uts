describe('GreenCart commerce flow', () => {
  it('Customer melakukan checkout dan Admin mengonfirmasi pesanan', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-identity"]').type('customer');
    cy.get('[data-testid="login-password"]').type('Customer123!');
    cy.contains('button', 'Masuk').click();
    cy.url().should('include', '/products');
    cy.contains('produk ditemukan').should('be.visible');
    cy.get('a[aria-label^="Lihat "]').first().click();
    cy.contains('button', 'Tambah ke keranjang').click();
    cy.get('[role="status"]').should('contain.text', 'ditambahkan');
    cy.contains('Lihat keranjang').click();
    cy.contains('h1', 'Pilihan hijaumu').should('be.visible');
    cy.contains('Lanjut checkout').click();
    cy.get('input[placeholder="0812 3456 7890"]').type('081234567890');
    cy.get('textarea').type('Jalan Cypress Nomor 15, Jakarta Selatan');
    cy.contains('button', 'Konfirmasi pesanan').click();
    cy.contains('Pesanan berhasil dibuat').should('be.visible');
    cy.get('h1').should('contain.text', 'GC-').invoke('text').then((number) => {
      cy.clearLocalStorage();
      cy.visit('/login');
      cy.get('[data-testid="login-identity"]').type('admin');
      cy.get('[data-testid="login-password"]').type('Admin123!');
      cy.contains('button', 'Masuk').click();
      cy.url().should('include', '/admin');
      cy.visit('/admin/orders');
      cy.contains('tr', number.trim()).within(() => cy.contains('Kelola').click());
      cy.contains('button', 'Jadikan CONFIRMED').click();
      cy.contains('CONFIRMED').should('be.visible');
    });
  });
});
