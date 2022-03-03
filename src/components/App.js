import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
      error: ''
    }
  }

  render = () => {
    return (
      <h1>Hello world</h1>
    )
  }
}


export default App;
