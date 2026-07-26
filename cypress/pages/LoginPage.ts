export class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillIdentity(identity: string) {
    cy.get('[data-testid="login-identity"]').clear().type(identity);
    return this;
  }

  fillPassword(password: string) {
    cy.get('[data-testid="login-password"]').clear().type(password, { log: false });
    return this;
  }

  submit() {
    cy.contains('button', 'Masuk').click();
    return this;
  }

  login(identity: string, password: string) {
    return this.visit().fillIdentity(identity).fillPassword(password).submit();
  }

  loginSuccessfully(identity: string, password: string) {
    this.login(identity, password);
    cy.location('pathname').should('match', /^\/(products|admin)$/);
    return this;
  }

  submitEmpty() {
    return this.visit().submit();
  }

  assertFieldErrors() {
    cy.contains('Email atau username wajib diisi.').should('be.visible');
    cy.contains('Password wajib diisi.').should('be.visible');
  }

  assertServerError(message: string) {
    cy.get('[role="alert"]').should('contain.text', message);
  }
}

export const loginPage = new LoginPage();
