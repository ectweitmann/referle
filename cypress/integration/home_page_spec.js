describe('Referle Home Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', { fixture: 'defaultSortedGetResult' }).as('defaultGet');
    cy.visit('http://localhost:3000/home');
    cy.wait(['@defaultGet']);
  });

  it('should display Header, first 10 words from the fetch, and PagNav', () => {
    cy.get('h1').contains('REFERLE');
    cy.get('.hamburger').contains('≡');
    cy.get('.words-container')
      .children()
      .should('have.length', 10);
    cy.get('.word-card')
      .children('.word-heuristics')
      .and('to.have.descendants','.word-heuristics-avgs')
      .and('to.have.descendants','.word-heuristics-tile-score');
    cy.get('.word-heuristics-avgs')
      .children()
      .should('have.length', 30);
    cy.get('.word-heuristics-tile-score')
      .children()
      .should('have.length', 20);
    cy.get('.page').children().contains(1);
    cy.get('p').contains('Next ›');
  });

  it('word cards should display the word and its heuristics', () => {
    cy.get('.word-card')
      .first()
      .contains('h2', 'SOARE');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '🟩 Avg. Correct 0.660');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '🟨 Avg. Present 1.108');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '⬜️ Avg. Absent 3.232');
    cy.get('.word-heuristics-tile-score')
      .first()
      .contains('.ats-paragraph', 'Avg. Tile Score');
    cy.get('.word-heuristics-tile-score')
      .first()
      .contains('.ats-score', '2.4');
  });

  it('should be able to bookmark a word card by double clicking/tapping it', () => {
    cy.intercept('PATCH', 'https://referle.herokuapp.com/api/v1/heuristics/10364', {
      statusCode: 200,
      body: {
        isBookmarked: true
      },
    }).as('patchRequest');

    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', {
      "current": {
          "page": 1
      },
      "next": {
          "page": 2,
          "limit": 10
      },
      "result": [
        {
          "guess": "SOARE",
          "avg_correct": "0.6600431965442765",
          "avg_present": "1.1079913606911447",
          "avg_absent": "3.231965442764579",
          "avg_tile_score": "2.428077753779698",
          "guess_pool_shrink": "0.9706479281842468",
          "solution_pool_shrink": "0.9617672331353879",
          "id": 10364,
          "isBookmarked": true
        }
      ]
    }).as('afterDblClick');

    cy.get('.word-card')
      .first().dblclick();
    cy.wait(['@patchRequest', '@afterDblClick']);
    cy.get('.word-card')
      .first().should('have.class', 'bookmarked');
  });

  it('should be able to unbookmark a word card by double clicking/tapping it', () => {
    cy.intercept('PATCH', 'https://referle.herokuapp.com/api/v1/heuristics/10670', {
      statusCode: 200,
      body: {
        isBookmarked: false
      },
    }).as('patchRequest');

    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', {
      "current": {
          "page": 1
      },
      "next": {
          "page": 2,
          "limit": 10
      },
      "result": [
        {
          "guess": "SOARE",
          "avg_correct": "0.6600431965442765",
          "avg_present": "1.1079913606911447",
          "avg_absent": "3.231965442764579",
          "avg_tile_score": "2.428077753779698",
          "guess_pool_shrink": "0.9706479281842468",
          "solution_pool_shrink": "0.9617672331353879",
          "id": 10364,
          "isBookmarked": true
        },
        {
          "guess": "STARE",
          "avg_correct": "0.5727861771058316",
          "avg_present": "1.1926565874730022",
          "avg_absent": "3.2345572354211662",
          "avg_tile_score": "2.3382289416846653",
          "guess_pool_shrink": "0.9681710199539264",
          "solution_pool_shrink": "0.9597007029934368",
          "id": 10670,
          "isBookmarked": false
        }
      ]
    }).as('afterDblClick');

    cy.get('.word-card')
      .first().next()
      .should('have.class', 'bookmarked').dblclick();
    cy.wait(['@patchRequest', '@afterDblClick']);
    cy.get('.word-card')
      .first().next().should('not.have.class', 'bookmarked');
  });

  it('should be able to change pages to see more results', () => {
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=2&limit=10', { fixture: 'page2DefaultSortedGetResult' }).as('defaultGetPage2');
    cy.get('.word-card')
      .first().contains('h2', 'SOARE');
    cy.get('.page-number').contains('1');
    cy.get('p').contains('Next ›').click()
    cy.wait(['@defaultGetPage2']);
    cy.get('.word-card')
      .first().contains('h2', 'SANER');
    cy.get('.page-number').contains('2');
    cy.get('p').contains('‹ Prev.').click();
    cy.wait(200);
    cy.get('.word-card')
      .first().contains('h2', 'SOARE');
    cy.get('.page-number').contains('1');
  });

  it('should be able to navigate to the Word Bank view', () => {
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/bookmarked?page=1&limit=10', { fixture: 'getBookmarkedWords' }).as('getBookmarkedWords')
    cy.get('.hamburger').click();
    cy.get('.nav-link').contains('Word Bank').click();
    cy.wait(['@getBookmarkedWords']);
    cy.location().should((location => {
      expect(location.href).to.eq('http://localhost:3000/wordbank')
    }));
  });
});
