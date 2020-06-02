Cypress.Commands.add('login', {}, () => {
  cy.visit('http://localhost:3000/login/register');

  cy.get('.tst-email').type('admin@localhost.pl');
  cy.get('.tst-password').type('admin');
  cy.get('.tst-register').click();

  cy.get('.tst-login').click();
  cy.get('.tst-email').type('admin@localhost.pl');
  cy.get('.tst-password').type('admin');
  cy.get('.tst-login').click();
});

Cypress.Commands.add('resetDb', {}, () => {
  cy.request('POST', 'http://localhost:3000/api/reset');
});
