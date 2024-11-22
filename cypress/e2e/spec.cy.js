describe('Sign In Page Request OTP page Basic Flow from password -> OTP again.', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.get('body').should('contain', 'levo');
        cy.get('body').should('contain', 'Sign In');
        cy.get('body').should('contain', 'Request OTP');
        cy.contains('button', 'Use Password Instead').click();
        cy.contains('button', 'Use OTP Instead').click();
        cy.get('body').should('contain', 'Request OTP');
      })
})

describe('Sign In Page For Password Wrong Creds', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.get('body').should('contain', 'levo');
        cy.get('body').should('contain', 'Sign In');
        cy.contains('button', 'Use Password Instead').click();
        cy.get('[id="email"]').type("abc@abc.com");
        cy.get('[id="password"]').type("thisisatest"); // No show password button on the sign in page.
        cy.contains('button', 'Continue').click();
        cy.get('body').should('contain', 'Invalid Credentials');
      })
})

//Get Right creds
describe('Sign In Page For Password With Right Creds', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.get('body').should('contain', 'levo');
        cy.get('body').should('contain', 'Sign In');
        cy.contains('button', 'Use Password Instead').click();
        cy.get('[id="email"]').type("abc@abc.com");
        cy.get('[id="password"]').type("thisisatest"); // No show password button on the sign in page.
        cy.contains('button', 'Continue').click();
        cy.get('body').should('contain', 'Invalid Credentials');
      })
})

describe('Sign In Page Google Oauth popups', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.get('body').should('contain', 'levo');
        cy.get('body').should('contain', 'Sign In');
        cy.window().then((win) => {
            cy.stub(win, 'open').as('popupWindow');
        });
        cy.get('button img[alt="google"]').parents('button').click();
        cy.get('@popupWindow').should('be.called');
      })
})

describe('Sign In Page Microsoft Oauth popups', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.get('body').should('contain', 'levo');
        cy.get('body').should('contain', 'Sign In');
        cy.window().then((win) => {
            cy.stub(win, 'open').as('popupWindow');
        });
        cy.get('button img[alt="microsoft"]').parents('button').click();
        cy.get('@popupWindow').should('be.called');
      })
})

// describe('Sign In Page ToS and Privacy policy', () => {
//     it('passes', () => {
//         cy.visit('https://app.levo.in.net/beta/signin');
//         cy.get('body').should('contain', 'levo');
//         cy.get('body').should('contain', 'Sign In');
//         cy.contains('a', 'Terms of Service').click();
//         cy.wait(3);
//         cy.url().should('include', '/terms');
//         cy.contains('Website Terms and Conditions of Use').should('be.visible');
//       })
// })


//Sign Up
describe('Sign Up Page General Overflow check with right password format', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.contains('a', 'Signup').click();
        cy.wait(5);
        cy.url().should('include', '/signup');
        cy.contains('h1', 'Create an account').click();
        cy.get('[id="email"]').type("abc@abc.com");
        cy.get('[id="password"]').type("Thisisatest@123");
        cy.contains('button', 'Continue').click();
        cy.get('button:has(svg.lucide-eye)').should('be.visible').click(); //Checks the show password button
        cy.get('[id="password"]').should('have.attr', 'type', 'text');
        cy.get('button:has(svg.lucide-eye-off)').should('be.visible').click();
        cy.get('[id="password"]').should('have.attr', 'type', 'password');
      });
})

describe('Sign Up Page with wrong password format', () => {
    it('passes', () => {
        cy.visit('https://app.levo.in.net/beta/signin');
        cy.contains('a', 'Signup').click();
        cy.wait(5);
        cy.url().should('include', '/signup');
        cy.contains('h1', 'Create an account').click();
        cy.get('[id="email"]').type("abc@abc.com");
        cy.get('[id="password"]').type("hisisatest");
        cy.contains('button', 'Continue').click();
        cy.contains('Password must contain at least 8 characters, one uppercase, one number and one special case character.').should('be.visible');

      });
})