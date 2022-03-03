import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
      previousPage: null,
      currentPage: 1,
      nextPage: 2,
      limit: 10,
      error: ''
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:3010/api/v1/heuristics/sorted/avg_tile_score?page=${this.state.currentPage}&limit=${this.state.limit}`)
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

  render = () => {
    return (
      <section className={"Home"}>
        <WordsContainer words={this.state.words} />
        {/* <PageNav pages={this.state.pages} /> */}
      </section>
    );
  }
}

export default Home;
