describe('Categories', () => {
  before(() => {
    cy.resetDb();
    cy.clearCookies();
    cy.login();
  });

  it('should add new category, update it and delete', () => {
    cy.visit('http://localhost:3000');
    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-category').click({ force: true });

    cy.get('.tst-category-editor-name').type('Category name');
    cy.get('.tst-category-editor-add').click();

    cy.get('.tst-category').should('have.length', 1);
    cy.get('.tst-category')
      .find('.tst-category-name')
      .contains('Category name');
    cy.get('.tst-category');
    cy.screenshot();

    cy.get('.tst-category-edit').click();
    cy.get('.tst-category-editor-name').type('Category name updated');
    cy.get('.tst-category-editor-update').click();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-categories').click({ force: true });

    cy.get('.tst-category').should('have.length', 1);
    cy.get('.tst-category')
      .find('.tst-category-name')
      .contains('Category name updated');
    cy.screenshot();

    cy.get('.tst-category-edit').click();
    cy.get('.tst-category-editor-delete').click();
    cy.get('.tst-category').should('have.length', 0);
  });
});
