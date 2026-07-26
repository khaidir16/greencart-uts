describe('GreenCart authentication', () => {
  it('menolak kredensial yang salah', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-identity"]').type('customer');
    cy.get('[data-testid="login-password"]').type('password-salah');
    cy.contains('button', 'Masuk').click();
    cy.get('[role="alert"]').should('contain.text', 'Email/username atau password salah.');
  });

  it('mengarahkan Admin ke dashboard', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-identity"]').type('admin');
    cy.get('[data-testid="login-password"]').type('Admin123!');
    cy.contains('button', 'Masuk').click();
    cy.url().should('include', '/admin');
    cy.contains('h1', 'Dashboard GreenCart').should('be.visible');
  });
});
