// ***********************************************
// This example commands.js shows you how to
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

// Cypress.Commands.add is declared globally in the Cypress types
Cypress.Commands.add('generateRandomString', (length: number): Cypress.Chainable<string> => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return cy.wrap(result);
});

Cypress.Commands.add('levoLogin', (loginData: { email: string; password: string }): void => {
  cy.viewport(1920, 1080);

  // Visit the login page
  cy.visit('/beta/signin');
  cy.wait(10000);
  cy.get('body').should('contain', 'levo');
  cy.get('body').should('contain', 'Sign In');
  cy.contains('button', 'Use Password Instead').click();

  // Use login data
  cy.get('[id="email"]').type(loginData.email);
  cy.get('[id="password"]').type(loginData.password);
  cy.contains('button', 'Continue').click();

  // Giving some time to load
  cy.wait(10000);
});

  