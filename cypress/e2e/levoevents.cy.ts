describe('Events', () => {

    //Fixture: LogIn before each test
    beforeEach(function(){
        cy.fixture('login.json').as('loginData');
        cy.get('@loginData').then((loginData: { email: string; password: string }) => {
          cy.levoLogin(loginData);
          cy.visit('/workspace/go-insta-care/events');
          cy.wait(10000);
          });
          
        //Auto Cleanup: If for any reason the previous event created by automation was not deleted.
        cy.get('input[name="search"]').click().type('Automation Event');
        cy.wait(10000);
        cy.get('table').then((table) => {
          if (table.find('td').text().includes('No results.')) {
            cy.log('No results found in the table.');
          } else {
            cy.get('table').contains('p', 'Automation Event').click();
            cy.wait(10000);
            cy.cleanup();
          }
        });
      });
    
    it('Create Event: In Person With all options enabled for free and paid ticket', function(){
        //Creating event
        cy.contains('button', 'Create Event').click();
        cy.get('[id="title"]').type('Automation Event');
        cy.get('[id="location"]').type('Las Vegas Convention Center');
        cy.wait(5000);
        cy.contains('p', 'Las Vegas Convention Center, north hall, Paradise Road, Las Vegas, NV, USA').click();
        cy.get('[data-testid="starts_at-date-input"] input').type('Next Week 5pm');
        cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
        cy.contains('button', /^Create Event\s*$/).click();
        cy.wait(10000);

        //Event Details
        cy.get('[id="description"]').click().type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        cy.wait(5000);
        cy.get('[id="max_capacity"]').type("100");
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="contact_email"]').type(randomString+'@'+'gmail.com');
        });
        cy.wait(5000);
        cy.contains('button', 'Save').click();
        cy.contains('button', 'Publish').click();
        cy.contains('button', 'Ticketing').click();

        //Free Ticket
        cy.contains('button', 'Add Ticket').click();
        cy.wait(2000);
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.contains('div', 'Advance Settings').click();
        cy.get('button[id="waitlist_enabled"]').should('not.exist');
        cy.get('[id="quantity"]').type("100");
        cy.get('button[id="waitlist_enabled"]').should('exist').click();
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
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.get('[id="is_paid"]').click();
        cy.get('[id="base_price"]').click().type('1200');
        cy.get('[id="unit_amount"]').click().type('1000');
        cy.contains('div', 'Advance Settings').click();
        cy.get('button[id="waitlist_enabled"]').should('not.exist');
        cy.get('[id="quantity"]').type("100");
        cy.get('button[id="waitlist_enabled"]').should('exist').click();
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
        
        //Registration Switch
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently accepting registrations. Turn this off to prevent new guests from registering for this event.');
        cy.get('[data-testid="registration-switch"]').should('exist').click();
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently not accepting registrations. Turn this on to allow new guests to register for this event.');
        cy.get('[data-testid="registration-switch"]').should('exist').click();
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently accepting registrations. Turn this off to prevent new guests from registering for this event.');

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
        cy.get('#title').invoke('val').as('ticketTitle' as string);
        cy.get('#title').click().clear().type('Updated Ticket Title');
        cy.contains('button', /^Save Ticket$/).click();
        cy.wait(5000);
        cy.get('@ticketTitle').then((ticketTitle: string) => {
          cy.get('[data-testid="Updated Ticket Title"]').find('h3').eq(0).should('not.contain', ticketTitle);
        })

        //Archive Ticket
        cy.get('[data-testid="Updated Ticket Title"]').eq(0).click();
        cy.wait(5000);
        cy.contains('button', /^Archive$/).click();
        cy.wait(10000);
        cy.get('[data-testid="Updated Ticket Title"]').contains('div', /^Archived$/).should('exist').and('be.visible');
        cy.get('[data-testid="Updated Ticket Title"]').click();
        cy.wait(5000);
        cy.contains('button', /^Unarchive$/).click();
        cy.wait(10000);
        cy.get('[data-testid="Updated Ticket Title"]').contains('div', /^Archived$/).should('not.exist');

        //External Ticketing
        cy.get('[data-testid="externalticketing-switch"]').should('exist').click();
        cy.get('[data-testid="externalticketing-url"]').should('exist');
        cy.get('[data-testid="Updated Ticket Title"]').should('not.be.visible');
        cy.get('[data-testid="externalticketing-switch"]').should('exist').click();
        cy.get('[data-testid="externalticketing-url"]').should('not.be.visible');
        cy.get('[data-testid="Updated Ticket Title"]').should('be.visible');

        //Editing a coupon
        cy.get('button[aria-label="edit"]').eq(0).click();
        cy.wait(5000);
        cy.get('[id="code"]').click().clear().type('UPDATEDCODE');
        cy.contains('button', /^Add$/).click();
        cy.wait(5000);
        cy.get('table').contains('p', /^UPDATEDCODE$/).should('exist');

        //Attendees Page
        //Adding a attendee
        cy.contains('button', /^Attendees$/).should('exist').click();
        cy.get('button[aria-label="Add Attendee"]').should('exist').click();
        cy.get('input[id="name"]').should('exist').click().type('Dummy Attendee');
        cy.get('input[id="email"]').should('exist').click().type('test@dummy.com');
        cy.get('div[id="ticket"]').should('exist').click();
        cy.wait(3000);
        cy.contains('div', /^Updated Ticket Title$/).should('exist').click();
        cy.contains('button', /^Add$/).should('exist').click();
        cy.wait(5000);
        //Remove if attendees working
        // cy.contains('svg[class="lucide lucide-x h-4 w-4"]').should('exist').click();
        cy.get('table').contains('td', 'Dummy Attendee').should('exist');
        cy.get('button[aria-label="Resend Confirmation"]').should('exist').click();
        cy.wait(5000);

        //Search Attendee
        cy.get('input[name="search"]').should('exist').click().clear().type('Dummy Attendee');
        cy.wait(5000);
        cy.get('table').contains('td', 'Dummy Attendee').should('exist');

        //Actions Attendee
        cy.get('button[aria-label="Refresh"]').should('exist').click();
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.wait(3000);
        cy.contains('button', /^Send Payment Link$/).should('exist').click();
        cy.wait(3000);
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.contains('button', /^Check In$/).should('exist').click();
        cy.wait(3000);
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.contains('button', /^Delete$/).should('exist').click();
        cy.wait(1000);
        cy.contains('button', /^Confirm$/).should('exist').click();
        cy.wait(3000);

        //Export Attendee
        
      })

      it('Create Event: Virtual', function(){
        cy.visit('https://app.levo.in.net/workspace/go-insta-care/events');
        cy.wait(10000);
        cy.contains('button', 'Create Event ').click();
        cy.generateRandomString(10).then((randomString) => {
            cy.get('[id="title"]').type(randomString);
          });
        cy.contains('div', 'Virtual').click();
        cy.get('[id="url"]').type("http://testlink.com")
        cy.get('[data-testid="starts_at-date-input"] input').type('Next Week 5pm');
        cy.get('[data-testid="ends_at-date-input"] input').type('Next Week 6pm');
        cy.contains('button', /^Create Event\s*$/).click();

        //Event Details
        cy.get('[id="description"]').click().type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        cy.wait(5000);
        cy.get('[id="max_capacity"]').type("100");
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="contact_email"]').type(randomString+'@'+'gmail.com');
        });
        cy.wait(5000);
        cy.contains('button', 'Save').click();
        cy.contains('button', 'Publish').click();
        cy.contains('button', 'Ticketing').click();

        //Free Ticket
        cy.contains('button', 'Add Ticket').click();
        cy.wait(2000);
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.contains('div', 'Advance Settings').click();
        cy.get('button[id="waitlist_enabled"]').should('not.exist');
        cy.get('[id="quantity"]').type("100");
        cy.get('button[id="waitlist_enabled"]').should('exist').click();
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
        cy.generateRandomString(10).then((randomString: string) => {
          cy.get('[id="title"]').type(randomString);
        });
        cy.get('[id="description"]').click().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        cy.get('[id="is_paid"]').click();
        cy.get('[id="base_price"]').click().type('1200');
        cy.get('[id="unit_amount"]').click().type('1000');
        cy.contains('div', 'Advance Settings').click();
        cy.get('button[id="waitlist_enabled"]').should('not.exist');
        cy.get('[id="quantity"]').type("100");
        cy.get('button[id="waitlist_enabled"]').should('exist').click();
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
        
        //Registration Switch
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently accepting registrations. Turn this off to prevent new guests from registering for this event.');
        cy.get('[data-testid="registration-switch"]').should('exist').click();
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently not accepting registrations. Turn this on to allow new guests to register for this event.');
        cy.get('[data-testid="registration-switch"]').should('exist').click();
        cy.get('[data-testid="registration-switch-text"]').should('exist').contains('Currently accepting registrations. Turn this off to prevent new guests from registering for this event.');

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
        cy.get('#title').invoke('val').as('ticketTitle' as string);
        cy.get('#title').click().clear().type('Updated Ticket Title');
        cy.contains('button', /^Save Ticket$/).click();
        cy.wait(5000);
        cy.get('@ticketTitle').then((ticketTitle: string) => {
          cy.get('[data-testid="Updated Ticket Title"]').find('h3').eq(0).should('not.contain', ticketTitle);
        })

        //Archive Ticket
        cy.get('[data-testid="Updated Ticket Title"]').eq(0).click();
        cy.wait(5000);
        cy.contains('button', /^Archive$/).click();
        cy.wait(10000);
        cy.get('[data-testid="Updated Ticket Title"]').contains('div', /^Archived$/).should('exist').and('be.visible');
        cy.get('[data-testid="Updated Ticket Title"]').click();
        cy.wait(5000);
        cy.contains('button', /^Unarchive$/).click();
        cy.wait(10000);
        cy.get('[data-testid="Updated Ticket Title"]').contains('div', /^Archived$/).should('not.exist');

        //External Ticketing
        cy.get('[data-testid="externalticketing-switch"]').should('exist').click();
        cy.get('[data-testid="externalticketing-url"]').should('exist');
        cy.get('[data-testid="Updated Ticket Title"]').should('not.be.visible');
        cy.get('[data-testid="externalticketing-switch"]').should('exist').click();
        cy.get('[data-testid="externalticketing-url"]').should('not.be.visible');
        cy.get('[data-testid="Updated Ticket Title"]').should('be.visible');

        //Editing a coupon
        cy.get('button[aria-label="edit"]').eq(0).click();
        cy.wait(5000);
        cy.get('[id="code"]').click().clear().type('UPDATEDCODE');
        cy.contains('button', /^Add$/).click();
        cy.wait(5000);
        cy.get('table').contains('p', /^UPDATEDCODE$/).should('exist');

        //Attendees Page
        //Adding a attendee
        cy.contains('button', /^Attendees$/).should('exist').click();
        cy.get('button[aria-label="Add Attendee"]').should('exist').click();
        cy.get('input[id="name"]').should('exist').click().type('Dummy Attendee');
        cy.get('input[id="email"]').should('exist').click().type('test@dummy.com');
        cy.get('div[id="ticket"]').should('exist').click();
        cy.wait(3000);
        cy.contains('div', /^Updated Ticket Title$/).should('exist').click();
        cy.contains('button', /^Add$/).should('exist').click();
        cy.wait(5000);
        //Remove if attendees working
        // cy.contains('svg[class="lucide lucide-x h-4 w-4"]').should('exist').click();
        cy.get('table').contains('td', 'Dummy Attendee').should('exist');
        cy.get('button[aria-label="Resend Confirmation"]').should('exist').click();
        cy.wait(5000);

        //Search Attendee
        cy.get('input[name="search"]').should('exist').click().clear().type('Dummy Attendee');
        cy.wait(5000);
        cy.get('table').contains('td', 'Dummy Attendee').should('exist');

        //Actions Attendee
        cy.get('button[aria-label="Refresh"]').should('exist').click();
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.wait(3000);
        cy.contains('button', /^Send Payment Link$/).should('exist').click();
        cy.wait(3000);
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.contains('button', /^Check In$/).should('exist').click();
        cy.wait(3000);
        cy.get('button[aria-label="Select all"]').should('exist').click();
        cy.contains('button', /^Delete$/).should('exist').click();
        cy.wait(1000);
        cy.contains('button', /^Confirm$/).should('exist').click();
        cy.wait(3000);

      })

      afterEach(() => {
        //Cleanup
        cy.cleanup();
      });
})
