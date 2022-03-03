import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
      pages: {},
      error: '',
    }
  }

  render = () => {
    <section className={"Home"}>
      <WordsContainer words={this.state.words} />
      <PageNav pages={this.state.pages} />
    </section>
  }
}

export default Home;
