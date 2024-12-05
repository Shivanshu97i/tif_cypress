describe('Events', () => {

    //Fixture: LogIn before each test
    beforeEach(function(){
        cy.fixture('login.json').as('loginData');
        cy.get('@loginData').then((loginData) => {
          //Viewport  
          cy.viewport(1920,1080);

            cy.visit('https://app.levo.in.net/beta/signin');
            cy.get('body').should('contain', 'levo');
            cy.get('body').should('contain', 'Sign In');
            cy.contains('button', 'Use Password Instead').click();
        
            // Use login data
            cy.get('[id="email"]').type(loginData.email);
            cy.get('[id="password"]').type(loginData.password);
            cy.contains('button', 'Continue').click();
            cy.wait(10000);
            cy.visit('https://app.levo.in.net/workspace/go-insta-care/events');
            cy.wait(10000);

            //Creating event
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
          });
      });
    
    it('Create Event: In Person With all options enabled for free and paid ticket', function(){
        
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

        //Free Ticket
        cy.contains('button', 'Add Ticket').click();
        cy.wait(2000);
        cy.generateRandomString(10).then((randomString) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.contains('div', 'Advance Settings').click();
        cy.get('[id="quantity"]').type("100");
        cy.get('[id="requires_approval"]').click();
        cy.get('[id="allow_start_date"]').click();
        cy.get('[data-testid="starts_at-date-input"] input').type('Tomorrow at 5pm');
        cy.get('[id="end_date"]').click();
        cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
        cy.get('[id="allow_to_upgrade"]').click();
        cy.get('[id="include_in_upgrade"]').click();
        cy.contains('button', 'Create Ticket').click();

        //Paid Ticket
        cy.contains('button', 'Add Ticket').click();
        cy.wait(2000);
        cy.generateRandomString(10).then((randomString) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.get('[id="is_paid"]').click();
        cy.get('[id="base_price"]').click().type('1200');
        cy.get('[id="unit_amount"]').click().type('1000');
        cy.contains('div', 'Advance Settings').click();
        cy.get('[id="quantity"]').type("100");
        cy.get('[id="requires_approval"]').click();
        cy.get('[id="allow_start_date"]').click();
        cy.get('[data-testid="starts_at-date-input"] input').type('Tomorrow at 5pm');
        cy.get('[id="end_date"]').click();
        cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
        cy.get('[id="allow_to_upgrade"]').click();
        cy.get('[id="include_in_upgrade"]').click();
        cy.contains('button', 'Create Ticket').click();
        cy.contains('button', 'Save').click();
        cy.wait(10000);
        
        //Coupon
         //Free
        cy.contains('button', 'Add Coupons').click();
        cy.get('[id="code"]').click().type('Test100');
        cy.get('[id="max_redemptions"]').click().type('10');
        cy.get('button[role="checkbox"]').eq(0).click();
        cy.contains('button', /^Add$/).click();
        cy.wait(5000);

         //Percent
        cy.contains('button', 'Add Coupons').click();
        cy.get('[id="code"]').click().type('Test101');
        cy.get('[id="max_redemptions"]').click().type('10');
        cy.contains('div', /^Percent$/).click();
        cy.get('[id="percent_off"]').clear().type('20');
        // cy.get('button[role="checkbox"]').eq(0).click();
        cy.contains('button', /^Add$/).click();
        cy.wait(5000);

         //Amount
        cy.contains('button', 'Add Coupons').click();
        cy.get('[id="code"]').click().type('Test102');
        cy.get('[id="max_redemptions"]').click().type('10');
        cy.contains('div', /^Amount$/).click();
        cy.get('[id="amount_off"]').clear().type('100');
        // cy.get('button[role="checkbox"]').eq(0).click();
        cy.contains('button', /^Add$/).click();
        cy.wait(5000);
        cy.contains('button', 'Save').click();
        cy.wait(10000);

        //Archive Ticket
        // cy.get('[title="Click to edit ticket"]').eq(0).click();
        // cy.wait(5000);
        // cy.contains('button', /^Archive$/).click();
        // cy.wait(10000);
        // cy.get('[title="Click to edit ticket"]').eq(0).contains('div', /^Archived$/).should('exist').and('be.visible');
        // cy.get('[title="Click to edit ticket"]').eq(0).click();
        // cy.wait(5000);
        // cy.contains('button', /^Unarchive$/).click();
        // cy.wait(10000);
        // cy.get('[title="Click to edit ticket"]').eq(0).contains('div', /^Archived$/).should('not.exist').and('not.be.visible');

        //Archive Coupon
        cy.get('button[aria-label="Archive"]').eq(0).click();
        cy.wait(3000);
        cy.get('button[aria-label="Unarchive"]').eq(0).should('exist');
        cy.get('button[aria-label="Unarchive"]').eq(0).click();
        cy.wait(3000);
        cy.get('button[aria-label="Archive"]').eq(0).should('exist');
        cy.wait(5000);

        //Editing a Ticket
        cy.get('[title="Click to edit ticket"]').eq(0).click();
        cy.get('#title').invoke('val').as('ticketTitle');
        cy.get('#title').click().clear().type('Updated Ticket Title');
        cy.contains('button', /^Save Ticket$/).click();
        cy.wait(5000);
        cy.get('@ticketTitle').then((ticketTitle) => {
          cy.get('[title="Click to edit ticket"]').eq(0).find('h3').eq(0).should('not.contain', ticketTitle);
        })
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

      afterEach(() => {
        //Cleanup
        cy.contains('button', 'Unpublish').click();
        cy.wait(30000);
        cy.get('svg.lucide-settings').parents('button').first().click(); 
        cy.contains('button', 'Move to Trash').click();
        cy.wait(2000);
        cy.contains('button', 'Confirm').click();
      });
})
