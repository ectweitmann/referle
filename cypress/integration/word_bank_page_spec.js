describe('Referle Word Bank Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/bookmarked?page=1&limit=10', { fixture: 'getBookmarkedWords' }).as('getBookmarkedWords')
    cy.visit('http://localhost:3000/wordbank');
    cy.wait(['@getBookmarkedWords']);
  });

  it('should display Header and only bookmarked words', () => {
    cy.get('h1').contains('REFERLE');
    cy.get('.hamburger').contains('≡');
    cy.get('.words-container')
      .children()
      .should('have.length', 10);
    cy.get('.word-card')
      .should('have.class', 'bookmarked');
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
      .contains('h2', 'ARISE');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '🟩 Avg. Correct 0.548');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '🟨 Avg. Present 1.209');
    cy.get('.word-heuristics-avgs')
      .first()
      .contains('p', '⬜️ Avg. Absent 3.243');
    cy.get('.word-heuristics-tile-score')
      .first()
      .contains('.ats-paragraph', 'Avg. Tile Score');
    cy.get('.word-heuristics-tile-score')
      .first()
      .contains('.ats-score', '2.3');
  });

  it('should be able to unbookmark a word card by double clicking/tapping it', () => {
    cy.intercept('PATCH', 'https://referle.herokuapp.com/api/v1/heuristics/533', {
      statusCode: 200,
      body: {
        isBookmarked: false
      },
    }).as('patchRequest');

    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/bookmarked?page=1&limit=10', { fixture: 'minus1GetBookmarkedWords.json' }).as('remove1Card');

    cy.get('.word-card')
      .first().contains('h2', 'ARISE').dblclick();
    cy.wait(['@remove1Card','@patchRequest']);
    cy.get('.word-card')
      .first().find('h2', 'AROSE');
  });

  it('should be able to change pages to see more results', () => {
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/bookmarked?page=2&limit=10', { fixture: 'page2GetBookmarkedWords.json' }).as('page2GetBookmarkedWords')
    cy.get('.word-card')
      .first().contains('h2', 'ARISE');
    cy.get('.page-number').contains('1');
    cy.get('p').contains('Next ›').click()
    cy.wait(['@page2GetBookmarkedWords']);
    cy.get('.word-card')
      .first().find('h2', 'STARE');
    cy.get('.page-number').contains('2');
    cy.get('p').contains('‹ Prev.').click();
    cy.wait(200);
    cy.get('.word-card')
      .first().contains('h2', 'ARISE');
    cy.get('.page-number').contains('1');
  });

  it('should be able to navigate to the Home view', () => {
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/sorted/avg_tile_score?page=1&limit=10', { fixture: 'defaultSortedGetResult' }).as('defaultGet');
    cy.get('.hamburger').click();
    cy.get('.nav-link').contains('Home').click();
    cy.wait(['@defaultGet']);
    cy.location().should((location => {
      expect(location.href).to.eq('http://localhost:3000/home')
    }));
  });

  it('should be met with a helpful message when Word Bank is empty', () => {
    cy.intercept('https://referle.herokuapp.com/api/v1/heuristics/bookmarked?page=1&limit=10', {
      "current": {
          "page": 1
      },
      "result": []
    }).as('emptyWordBank')
    cy.reload();
    cy.wait(['@emptyWordBank']);
    cy.get('.empty-message').contains('Your Word Bank is empty. Double tap on word cards to add them to your Word Bank!');
  });
});
