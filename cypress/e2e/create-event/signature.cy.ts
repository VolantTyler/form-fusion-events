describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('creates a new signature event', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080/');
    cy.get('.text-center > .inline-flex').click();
    cy.get('#\\:r4\\:-form-item').clear('co');
    cy.get('#\\:r4\\:-form-item').type('conf1');
    cy.get('#\\:r5\\:-form-item').clear();
    cy.get('#\\:r5\\:-form-item').type('NYC');
    cy.get('#\\:r6\\:-form-item').click();
    cy.get(':nth-child(2) > :nth-child(4) > .rdp-button_reset').click();
    cy.get('#\\:r8\\:-form-item > .flex').clear('12');
    cy.get('#\\:r8\\:-form-item > .flex').type('12');
    cy.get('#\\:r9\\:-form-item').clear('co');
    cy.get('#\\:r9\\:-form-item').type('conference');
    cy.get('#\\:ra\\:-form-item').clear();
    cy.get('#\\:ra\\:-form-item').type('conf-1');
    cy.get('#\\:rb\\:-form-item').clear();
    cy.get('#\\:rb\\:-form-item').type('adv-1');
    cy.get('.bg-primary').click();
    cy.get('.text-2xl').should('have.text', 'conf1');
    cy.get('.space-y-1\\.5 > .inline-flex').should('have.text', 'Signature Event');
    cy.get('[data-lov-id="src/components/EventCard.tsx:88:16"] > .font-medium').should('have.text', 'conf-1');
    /* ==== End Cypress Studio ==== */
  });
})