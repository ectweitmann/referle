import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import { getBookmarkedWords, updateWordsBookmarkedStatus } from '../apiCalls';
import { handleResponse, cleanData } from '../utils';
import '../styles/WordBank.css';

class WordBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      lastUpdated: '',
      previousPage: null,
      currentPage: 1,
      nextPage: 2,
      limit: 10,
    }
  }

  updateWordBank = (id, status) => {
    if (this.state.words.length === 1 && this.state.current !== 1) {
      this.changePage(this.state.previousPage || 1);
    }
    updateWordsBookmarkedStatus(id, status)
      .then(response => handleResponse(response))
      .then(updatedWord => this.setState({ lastUpdated: Date.now() }))
      .catch(err => this.props.registerError(err));
  }

  changePage = (page) => {
    getBookmarkedWords(page, this.state.limit)
      .then(response => handleResponse(response))
      .then(results => {
        const cleanedResults = cleanData(results);
        return this.setState({
          words: cleanedResults.result,
          previousPage: cleanedResults.previous,
          currentPage: cleanedResults.current,
          nextPage: cleanedResults.next,
        });
      })
      .catch(err => this.props.registerError(err));
  }

  componentDidMount = () => {
    getBookmarkedWords(this.state.currentPage, this.state.limit)
      .then(response => handleResponse(response))
      .then(results => {
        const cleanedResults = cleanData(results);
        return this.setState({
          words: cleanedResults.result,
          previousPage: cleanedResults.previous,
          currentPage: cleanedResults.current,
          nextPage: cleanedResults.next,
        });
      })
      .catch(err => this.props.registerError(err));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.lastUpdated !== prevState.lastUpdated) {
      getBookmarkedWords(this.state.currentPage, this.state.limit)
        .then(response => handleResponse(response))
        .then(results => {
          const cleanedResults = cleanData(results);
          return this.setState({
            words: cleanedResults.result,
            previousPage: cleanedResults.previous,
            currentPage: cleanedResults.current,
            nextPage: cleanedResults.next,
          });
        })
        .catch(err => this.props.registerError(err));
    }
  }

  render = () => {
    let displayEmptyMessage = null;
    if (!this.state.words.length) {
      displayEmptyMessage = <h2 className="empty-message">Your Word Bank is empty. <span className="green">Double tap</span> on word cards to add them to your Word Bank!</h2>;
    }

    return (
      <section className="WordBank">
      <div className="view-container">
        {displayEmptyMessage}
        <WordsContainer words={this.state.words} updateWordBank={this.updateWordBank}/>
        <PageNav
          previous={this.state.previousPage}
          current={this.state.currentPage}
          next={this.state.nextPage}
          changePage={this.changePage}
        />
      </div>
      </section>
    );
  }
}

export default WordBank;

WordBank.propTypes = {
  registerError: PropTypes.func.isRequired
}
