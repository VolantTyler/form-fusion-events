describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('delete signature event', function() {
    cy.visit('localhost:8080');
    cy.get('#radix-\\:r0\\:-trigger-signature').click();
    cy.get('[data-testid="create-signature-event"]').click();
    cy.get('[data-testid="event-name"]').type('signature-con');
    cy.get('[data-testid="event-location"]').type('Anaheim');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(5) > :nth-child(5) > .rdp-button_reset').click();
    cy.get('[data-testid="event-duration"]').type('1');
    cy.get('[data-testid="event-description"]').type('con');
    cy.get('[data-testid="event-id"]').type('con1');
    cy.get('[data-testid="event-adv-id"]').type('con2'); 
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.text-2xl').should('have.text', 'signature-con');
    cy.get('.space-y-1\\.5 > .inline-flex').should('be.visible');
    cy.get('.absolute > .inline-flex').click();
    cy.get('#radix-\\:r0\\:-content-signature > .text-center > .text-lg').should('have.text', 'No Signature Events');
  });
})