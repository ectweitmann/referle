import React, { Component } from 'react';
import WordsContainer from './WordsContainer';
import PageNav from './PageNav';
import '../styles/WordBank.css';

class WordBank extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
      pages: {},
      error: '',
    }
  }

  render = () => {
    <section className={"WordBank"}>
      <WordsContainer words={this.state.words} />
      <PageNav pages={this.state.pages} />
    </section>
  }
}

export default WordBank;
