/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      
      generateRandomString(length: number): Chainable<string>;
  
      levoLogin(loginData: { email: string; password: string }): void;

      cleanup():void;
    }
  }
  