describe('non-signature event spec', () => {
  it('fails to find a non-existent element', function() {
    cy.visit('localhost:8080');
    cy.get('#non-existent-element').should('exist');
  });

  it('creates a non-signature event', function() {
    cy.visit('http://localhost:8080/');
    cy.get('.flex > .transition-colors').click();
    cy.get('#radix-\\:r0\\:-trigger-affiliate').click();
    cy.get('[data-testid="create-affiliate-event"]').click();
    cy.get('[data-testid="event-name"]').clear('A');
    cy.get('[data-testid="event-name"]').type('Affiliate Conf 2024');
    cy.get('[data-testid="event-location"]').clear();
    cy.get('[data-testid="event-location"]').type('There');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(2) > :nth-child(6) > .rdp-button_reset').click();
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.text-2xl').should('have.text', 'Affiliate Conf 2024');
    cy.get('.space-y-1\\.5 > .inline-flex').should('be.visible');
  });
})