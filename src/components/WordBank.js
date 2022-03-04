import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import { getBookmarkedWords, updateWordsBookmarkedStatus } from '../apiCalls';
import '../styles/WordBank.css';

class WordBank extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
      lastUpdated: '',
      previousPage: null,
      currentPage: 1,
      nextPage: 2,
      limit: 10,
      error: ''
    }
  }

  updateWordBank = (id, status) => {
    updateWordsBookmarkedStatus(id, status)
      .then(response => response.json())
      .then(updatedWord => this.setState({ lastUpdated: Date.now() }))
      .catch(error => this.setState({ error: error.message }));
  }

  changePage = (page) => {
    getBookmarkedWords(page, this.state.limit)
      .then(response => response.json())
      .then(results => {
        return this.setState({
          words: results.result,
          previousPage: results.previous ? results.previous.page : null,
          currentPage: results.current.page,
          nextPage: results.next ? results.next.page : null,
        });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  componentDidMount = () => {
    getBookmarkedWords(this.state.currentPage, this.state.limit)
      .then(response => response.json())
      .then(results => {
        return this.setState({
          words: results.result,
          previousPage: results.previous ? results.previous.page : null,
          currentPage: results.current.page,
          nextPage: results.next ? results.next.page : null,
        });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.lastUpdated !== prevState.lastUpdated) {
      getBookmarkedWords(this.state.currentPage, this.state.limit)
        .then(response => response.json())
        .then(results => {
          return this.setState({
            words: results.result,
            previousPage: results.previous ? results.previous.page : null,
            currentPage: results.current.page,
            nextPage: results.next ? results.next.page : null,
          });
        })
        .catch(err => this.setState({ error: err.message }));
    }
  }

  render = () => {
    return (
      <section className={"WordBank"}>
        <WordsContainer words={this.state.words} updateWordBank={this.updateWordBank}/>
        <PageNav
          previous={this.state.previousPage}
          current={this.state.currentPage}
          next={this.state.nextPage}
          changePage={this.changePage}
        />
      </section>
    );
  }
}

export default WordBank;
