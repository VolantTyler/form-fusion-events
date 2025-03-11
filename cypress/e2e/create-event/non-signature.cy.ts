describe('template spec', () => {
  it('fails to find a non-existent element', function() {
    cy.visit('localhost:8080');
    cy.get('#non-existent-element').should('exist');
  });

  it('creates a non-signature event', function() {
    cy.visit('localhost:8080');
    cy.get('#radix-\\:r0\\:-trigger-affiliate').click();
    cy.get('.text-center > .inline-flex').click();
    cy.get('#\\:r4\\:-form-item').type('Affiliate Conf 2025');
    cy.get('#\\:r5\\:-form-item').clear();
    cy.get('#\\:r5\\:-form-item').type('Nebraska');
    cy.get('#\\:r6\\:-form-item').click();
    cy.get(':nth-child(4) > :nth-child(5) > .rdp-button_reset').click();
    cy.get('#\\:r8\\:-form-item > .flex').clear('2');
    cy.get('#\\:r8\\:-form-item > .flex').type('3');
    cy.get('.bg-primary').click();
    cy.get('.text-2xl').should('have.text', 'Affiliate Conf 2025');
  });
})