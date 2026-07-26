export type CheckoutData = {
  recipientName?: string;
  phone: string;
  shippingAddress: string;
};

export class CheckoutPage {
  fill(data: CheckoutData) {
    if (data.recipientName !== undefined) {
      cy.get('input[placeholder="Nama lengkap"]').clear().type(data.recipientName);
    }
    cy.get('input[placeholder="0812 3456 7890"]').clear().type(data.phone);
    cy.get('textarea').clear().type(data.shippingAddress);
    return this;
  }

  submit() {
    cy.contains('button', 'Konfirmasi pesanan').click();
    return this;
  }

  assertValidationError() {
    cy.get('[role="alert"]').should('be.visible');
    cy.get('.field-error').should('have.length.at.least', 1);
    return this;
  }

  assertOrderCreated() {
    cy.contains('Pesanan berhasil dibuat').should('be.visible');
    cy.get('h1').should('contain.text', 'GC-');
    return this;
  }
}

export const checkoutPage = new CheckoutPage();
