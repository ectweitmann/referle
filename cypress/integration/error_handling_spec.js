describe('Referle Error Handling', () => {
  it('should be met with error modal if patch request is sent with invalid id', () => {
    cy.viewport('iphone-xr');
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', { fixture: 'defaultSortedGetResult' }).as('defaultGet');
    cy.intercept('PATCH', 'https://referle.herokuapp.com/api/v1/heuristics/ffffff', {
      statusCode: 404,
    }).as('patchRequest');

    cy.visit('http://localhost:3000/home');
    cy.wait(['@defaultGet']);
    cy.get('.word-card')
      .first().dblclick()
    cy.get('.ErrorModal')
      .get('.error-modal-content')
      .get('.error-modal-body')
      .get('.error-text').contains('404 Not Found: Unable to load content. Please try reloading the page.');
  });

  it('should be met with error message if there is an internal server error', () => {
    cy.viewport('iphone-xr');
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', {
      statusCode: 500,
    }).as('syntheticError');

    cy.visit('http://localhost:3000/home');
    cy.wait(['@syntheticError']);
    cy.get('.ErrorModal')
      .get('.error-modal-content')
      .get('.error-modal-body')
      .get('.error-text').contains('500 Internal Server Error: Unable to load content. Please try reloading the page.');
  });
});
