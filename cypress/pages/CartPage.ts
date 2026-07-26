export class CartPage {
  visit() {
    cy.visit('/cart');
    cy.contains('h1', 'Pilihan hijaumu').should('be.visible');
    return this;
  }

  assertHasItems() {
    cy.contains('Lanjut checkout').should('be.visible');
    cy.get('button[aria-label^="Hapus "]').should('have.length.at.least', 1);
    return this;
  }

  increaseFirstItem() {
    cy.get('button[aria-label^="Tambah "]').first().click();
    return this;
  }

  removeFirstItem() {
    cy.get('button[aria-label^="Hapus "]').first().click();
    return this;
  }

  clearAllItems() {
    const removeNext = (): void => {
      cy.get('body').then(($body) => {
        const buttons = $body.find('button[aria-label^="Hapus "]');
        if (buttons.length === 0) return;
        cy.wrap(buttons.first()).click();
        removeNext();
      });
    };

    removeNext();
    cy.contains('Keranjang masih kosong').should('be.visible');
    return this;
  }

  proceedToCheckout() {
    cy.contains('Lanjut checkout').click();
    cy.contains('h1', 'Data penerima').should('be.visible');
    return this;
  }
}

export const cartPage = new CartPage();
