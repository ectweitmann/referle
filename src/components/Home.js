import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import { getDefaultWordList, updateWordsBookmarkedStatus } from '../apiCalls';
import { cleanData } from '../utils';
import '../styles/Home.css';

class Home extends Component {
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
    getDefaultWordList(page, this.state.limit)
      .then(response => response.json())
      .then(results => {
        const cleanedResults = cleanData(results);
        return this.setState({
          words: cleanedResults.result,
          previousPage: cleanedResults.previous,
          currentPage: cleanedResults.current,
          nextPage: cleanedResults.next,
        });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  componentDidMount = () => {
    getDefaultWordList(this.state.currentPage, this.state.limit)
      .then(response => response.json())
      .then(results => {
        const cleanedResults = cleanData(results);
        return this.setState({
          words: cleanedResults.result,
          previousPage: cleanedResults.previous,
          currentPage: cleanedResults.current,
          nextPage: cleanedResults.next,
        });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.lastUpdated !== prevState.lastUpdated) {
      getDefaultWordList(this.state.currentPage, this.state.limit)
        .then(response => response.json())
        .then(results => {
          const cleanedResults = cleanData(results);
          return this.setState({
            words: cleanedResults.result,
            previousPage: cleanedResults.previous,
            currentPage: cleanedResults.current,
            nextPage: cleanedResults.next,
          });
        })
        .catch(err => this.setState({ error: err.message }));
    }
  }

  render = () => {
    return (
      <section className={"Home"}>
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

export default Home;
