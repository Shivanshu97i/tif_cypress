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

Cypress.Commands.add('cleanup', (): void => {
  cy.get('body').then((body) => {
    if (body.find('button:contains("Unpublish")').length > 0) {
      // Check Unpublish button exists
      cy.contains('button', 'Unpublish').click();
      cy.wait(15000);
    } else {
      cy.log('Unpublish button does not exist.');
    }
  }).then(() => {
    cy.get('[data-testid="event-settings"]').find('button').eq(0).click();
    cy.contains('button', 'Move to Trash').click();
    cy.wait(2000);
    cy.contains('button', 'Confirm').click();
  });
});
