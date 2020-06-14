describe('Posts', () => {
  before(() => {
    cy.resetDb();
    cy.clearCookies();
    cy.login();
  });

  it('should add new post, update it and delete', () => {
    cy.visit('http://localhost:3000');
    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-post').click();

    cy.get('.tst-post-editor-title').type('Post title');
    cy.get('.tst-post-editor-description').type('Post description');
    cy.get('.tst-post-editor-add').click();

    cy.get('.tst-post').should('have.length', 1);
    cy.get('.tst-post')
      .find('.tst-post-title')
      .contains('Post title');
    cy.get('.tst-post')
      .find('.tst-post-description')
      .contains('Post description');
    cy.screenshot();

    cy.get('.tst-post-edit').click();
    cy.get('.tst-post-editor-title').type('Post title updated');
    cy.get('.tst-post-editor-description').type('Post description updated');
    cy.get('.tst-post-editor-update').click();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-posts').click();

    cy.get('.tst-post').should('have.length', 1);
    cy.get('.tst-post')
      .find('.tst-post-title')
      .contains('Post title updated');
    cy.get('.tst-post')
      .find('.tst-post-description')
      .contains('Post description updated');
    cy.screenshot();

    cy.get('.tst-post-edit').click();
    cy.get('.tst-post-editor-delete').click();
    cy.get('.tst-post').should('have.length', 0);
  });
});
