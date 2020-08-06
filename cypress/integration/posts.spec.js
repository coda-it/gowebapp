describe('Posts', () => {
  before(() => {
    cy.resetDb();
    cy.clearCookies();
    cy.login();
  });

  it('should add new post, update, visit it and delete', () => {
    cy.visit('http://localhost:3000');
    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-add-post').click();

    cy.get('.tst-post-editor-title').type('Post title');
    cy.get('.tst-post-editor-description').type('Post description');
    cy.get('.tst-post-editor-add').click();

    cy.get('.tst-posts').children('[class*=tst-post-]').should('have.length', 1);
    cy.get('.tst-post-0')
      .find('.tst-post-title-0')
      .contains('Post title');
    cy.screenshot();

    cy.get('.tst-nav-posts').click();
    cy.get('.tst-post-link-0').click();
    cy.get('.tst-post-module').should('be.visible');
    cy.screenshot();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-posts').click();

    cy.get('.tst-post-edit-0').click();
    cy.get('.tst-post-editor-title').clear().type('Post title updated');
    cy.get('.tst-post-editor-description').clear().type('Post description updated');
    cy.get('.tst-post-editor-update').click();

    cy.get('.tst-nav-admin-sub').invoke('show');
    cy.get('.tst-nav-admin-posts').click();

    cy.get('.tst-posts').children('[class*=tst-post-]').should('have.length', 1);
    cy.get('.tst-post-0')
      .find('.tst-post-title-0')
      .contains('Post title updated');
    cy.screenshot();

    cy.get('.tst-post-edit-0').click();
    cy.get('.tst-post-editor-delete').click();
    cy.get('.tst-post').should('have.length', 0);
    cy.screenshot();
  });
});
