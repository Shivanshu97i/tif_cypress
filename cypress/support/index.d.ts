/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Generates a random string of a given length.
       * @param length The length of the string to generate.
       * @returns Chainable<string> The generated random string.
       */
      generateRandomString(length: number): Chainable<string>;
  
      /**
       * Performs login for Levo application.
       * @param loginData Object containing email and password.
       */
      levoLogin(loginData: { email: string; password: string }): void;
    }
  }
  