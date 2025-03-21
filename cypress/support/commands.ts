/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('createEvent', (eventName, eventLocation, eventDate, eventDuration, eventDescription, eventId, eventAdvId) => {
    cy.visit('localhost:8080');
    cy.get('.flex > .transition-colors').click();
    cy.get('[data-testid="event-name"]').type('Conf 2024');
    cy.get('[data-testid="event-location"]').type('Here');
    cy.get('[data-testid="event-date"]').click();
    cy.get(':nth-child(4) > :nth-child(6) > .rdp-button_reset').click();
    cy.get('[data-testid="event-duration"]').type('2');
    cy.get('[data-testid="event-description"]').type('Event');
    cy.get('[data-testid="event-id"]').type('123');
    cy.get('[data-testid="event-adv-id"]').type('098');
    cy.get('[data-testid="submit-event"]').click();
    cy.get('.text-2xl').should('have.text', 'Conf 2024');
    cy.get('.space-y-1\\.5 > .inline-flex').should('be.visible');
    }
);