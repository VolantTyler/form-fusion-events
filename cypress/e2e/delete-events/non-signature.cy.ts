describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('delete affiliate event', function() {
    cy.visit('localhost:8080');
    cy.get('#radix-\\:r0\\:-trigger-affiliate').click();
    cy.get('[data-testid="create-affiliate-event"]').click();
    cy.get('[data-testid="event-name"]').type('Affiliate 2024');
    cy.get('[data-testid="event-location"]').type('New Jersey');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(5) > :nth-child(6) > .rdp-button_reset').click();
    cy.get('[data-testid="event-duration"]').type('8');
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.space-y-1\\.5 > .inline-flex').should('be.visible');
    cy.get('.text-2xl').should('have.text', 'Affiliate 2024');
    cy.get('.absolute > .inline-flex').click();
    cy.get('#radix-\\:r0\\:-content-affiliate > .text-center > .text-lg').should('have.text', 'No Affiliate Events');
  });
})