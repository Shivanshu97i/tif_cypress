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
        cy.get('[id="location"]').type('Las Vegas Convention Center');
        cy.wait(5000);
        cy.contains('p', 'Las Vegas Convention Center, north hall, Paradise Road, Las Vegas, NV, USA').click();
        cy.get('[data-testid="starts_at-date-input"] input').type('Next Week 5pm');
        cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
        cy.contains('button', /^Create Event\s*$/).click();
        cy.wait(10000);
        cy.get('[id="description"]').click().type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        cy.wait(5000);
        cy.get('[id="max_capacity"]').type("100");
        cy.generateRandomString(10).then((randomString) => {
          cy.get('[id="contact_email"]').type(randomString+'@'+'gmail.com');
        });
        cy.wait(5000);
        cy.contains('button', 'Save').click();
        cy.contains('button', 'Publish').click();
        cy.contains('button', 'Ticketing').click();
        cy.contains('button', 'Add Ticket').click();
        cy.wait(2000);
        cy.generateRandomString(10).then((randomString) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.contains('div', 'Advance Settings').click();
        cy.get('[id="quantity"]').type("100");
        cy.contains('button', 'Create Ticket').click();
      })

      // it('Create Event: Virtual', function(){
      //   cy.visit('https://app.levo.in.net/workspace/go-insta-care/events');
      //   cy.wait(10000);
      //   cy.contains('button', 'Create Event ').click();
      //   cy.generateRandomString(10).then((randomString) => {
      //       cy.get('[id="title"]').type(randomString);
      //     });
      //   cy.contains('div', 'Virtual').click();
      //   cy.get('[id="url"]').type("http://testlink.com")
      //   cy.get('[data-testid="starts_at-date-input"] input').type('Next Week 5pm');
      //   cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
      //   cy.contains('button', /^Create Event\s*$/).click();
      // })
})
