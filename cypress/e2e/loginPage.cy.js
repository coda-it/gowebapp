describe('Login page', () => {
  before(() => {
    cy.resetDb();
    cy.clearCookies();
  });

  it('should register successfully', () => {
    cy.visit('http://localhost:3000/login/register');
    cy.get('.tst-email').type('admin@localhost.pl');
    cy.get('.tst-password').type('admin');
    cy.get('.tst-register').click(); 
  });

  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.tst-email').type('admin@localhost.pl');
    cy.get('.tst-password').type('admin');
    cy.get('.tst-login').click();
    cy.screenshot();
  });
});
