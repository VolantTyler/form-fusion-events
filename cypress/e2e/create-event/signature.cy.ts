describe('signature event spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })


  it('signature-newevent-button', function() {
    cy.visit('localhost:8080');
    cy.get('.flex > .transition-colors').click();
    cy.get('[data-testid="event-name"]').clear('C');
    cy.get('[data-testid="event-name"]').type('Conf 2024');
    cy.get('[data-testid="event-location"]').clear();
    cy.get('[data-testid="event-location"]').type('Here');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(4) > :nth-child(6) > .rdp-button_reset').click();
    cy.get('[data-testid="event-duration"]').clear('2');
    cy.get('[data-testid="event-duration"]').type('2');
    cy.get('[data-testid="event-description"]').clear('E');
    cy.get('[data-testid="event-description"]').type('Event');
    cy.get('[data-testid="event-id"]').clear();
    cy.get('[data-testid="event-id"]').type('123');
    cy.get('[data-testid="event-adv-id"]').clear();
    cy.get('[data-testid="event-adv-id"]').type('098');
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.text-2xl').should('have.text', 'Conf 2024');
    cy.get('.space-y-1\\.5 > .inline-flex').should('be.visible');
  });
})