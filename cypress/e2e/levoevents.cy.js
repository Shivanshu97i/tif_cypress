describe('Events', () => {
    //Fixture: LogIn before each test
    beforeEach(function(){
        cy.fixture('login.json').as('loginData');
        cy.get('@loginData').then((loginData) => {
            cy.visit('https://app.levo.in.net/beta/signin');
            cy.get('body').should('contain', 'levo');
            cy.get('body').should('contain', 'Sign In');
            cy.contains('button', 'Use Password Instead').click();
        
            // Use login data
            cy.get('[id="email"]').type(loginData.email);
            cy.get('[id="password"]').type(loginData.password);
            cy.contains('button', 'Continue').click();
            cy.wait(10000);
          });
      });
    
    it('Create Event: In Person', function(){
        cy.visit('https://app.levo.in.net/workspace/go-insta-care/events');
        cy.wait(10000);
        cy.contains('button', 'Create Event').click();
        cy.generateRandomString(10).then((randomString) => {
            cy.get('[id="title"]').type(randomString);
          });
        cy.get('[id="lcoation"]').type('Las Vegas Convention Center');
        cy.get('input[placeholder="e.g. \\&quot;in 2 hours or tomorrow at 5pm\\&quot;"]').eq(0).type('Next Week 5pm');
        cy.get('input[placeholder="e.g. \\&quot;in 2 hours or tomorrow at 5pm\\&quot;"]').eq(1).type('Next Week 6pm');
        cy.contains('button', 'Create Event').click();
      })
})
