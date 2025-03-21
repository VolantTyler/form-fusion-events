describe('template spec', () => {
  beforeEach(() => {
    cy.createEvent('Conf 2024', 'Here', '2024-05-06', '2', 'Event', '123', '098');
  });
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('edit event', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.absolute > .hover\\:bg-blue-100').click();
    cy.get('[data-testid="event-name"]').clear('Conf 2024');
    cy.get('[data-testid="event-name"]').type('Re-Conf 2024');
    cy.get('[data-testid="event-location"]').clear('Her');
    cy.get('[data-testid="event-location"]').type('Everywhere');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(4) > :nth-child(7) > .rdp-button_reset').click();
    cy.get('[data-testid="event-duration"]').clear('1');
    cy.get('[data-testid="event-duration"]').type('24');
    cy.get('[data-testid="event-description"]').clear('REvent');
    cy.get('[data-testid="event-description"]').type('Re-Event');
    cy.get('[data-testid="event-id"]').clear();
    cy.get('[data-testid="event-id"]').type('Re-123');
    cy.get('[data-testid="event-adv-id"]').clear();
    cy.get('[data-testid="event-adv-id"]').type('Re-098');
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.text-2xl').should('have.text', 'Re-Conf 2024');
    /* ==== End Cypress Studio ==== */
  });
})