import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import { getDefaultWordList, updateWordsBookmarkedStatus } from '../apiCalls';
import PageNav from './PageNav';
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

  componentDidMount = () => {
    getDefaultWordList(this.state.currentPage, this.state.limit)
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
      getDefaultWordList(this.state.currentPage, this.state.limit)
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
      <section className={"Home"}>
        <WordsContainer words={this.state.words} updateWordBank={this.updateWordBank}/>
        {/* <PageNav pages={this.state.pages} /> */}
      </section>
    );
  }
}

export default Home;
