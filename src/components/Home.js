import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import { getDefaultWordList, updateWordsBookmarkedStatus } from '../apiCalls';
import { handleResponse, cleanData } from '../utils';
import '../styles/Home.css';

class Home extends Component {
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
    updateWordsBookmarkedStatus(id, status)
      .then(response => handleResponse(response))
      .then(updatedWord => this.setState({ lastUpdated: Date.now() }))
      .catch(err => this.props.registerError(err));
  }

  changePage = (page) => {
    getDefaultWordList(page, this.state.limit)
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
    getDefaultWordList(this.state.currentPage, this.state.limit)
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
      getDefaultWordList(this.state.currentPage, this.state.limit)
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
    return (
      <section className={"Home"}>
        <div className="view-container">
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

export default Home;
