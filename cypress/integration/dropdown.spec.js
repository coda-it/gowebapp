describe('Categories', () => {
  before(() => {
    cy.resetDb();
    cy.clearCookies();
    cy.login();
  });

  it('should add new post with changed category', () => {
    cy.visit('http://localhost:3000');
    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-category').click();

    cy.get('.tst-category-editor-name').type('Category first');
    cy.get('.tst-category-editor-add').click();

    cy.get('.tst-category').should('have.length', 1);
    cy.get('.tst-category')
      .find('.tst-category-name')
      .contains('Category first');
    cy.get('.tst-category');
    cy.screenshot();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-category').click();

    cy.get('.tst-category-editor-name').type('Category second');
    cy.get('.tst-category-editor-add').click();

    cy.get('.tst-category').should('have.length', 2);
    cy.get('.tst-category')
      .find('.tst-category-name')
      .contains('Category second');
    cy.get('.tst-category');
    cy.screenshot();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-post').click();
    cy.get('.tst-post-editor-title').type('Post first');
    cy.get('[data-cy=dropdown-button]').click();
    cy.get('[data-cy=dropdown-item]').contains('Category second').click();
    cy.get('.tst-post-editor-add').click();

    cy.get('.tst-post-edit-0').click();
    cy.get('[data-cy=dropdown-button]').should('contain', 'Category second');
  });
});
