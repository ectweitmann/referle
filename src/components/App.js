import React, { Component } from 'react';
import Header from './Header';
import NavModal from './NavModal';
import Home from './Home';
import WordBank from './WordBank';
import ErrorModal from './ErrorModal';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      error: ''
    }
  }

  toggleNavModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal }
    });
  }

  registerError = (error) => {
    this.setState({ error: error.message });
  }

  render = () => {
    const errorModal = this.state.error ? <ErrorModal error={this.state.error} /> : null;
    return (
      <div className="App">
        <Header toggleNavModal={this.toggleNavModal} />
        <NavModal showModal={this.state.showModal} toggleNavModal={this.toggleNavModal} />
        <Switch>
          <Route exact path="/home" render= { () => <Home registerError={this.registerError}/> } />
          <Route exact path="/wordbank" render= { () => <WordBank registerError={this.registerError}/> } />
          <Redirect to="/home" />
        </Switch>
        {errorModal}
      </div>
    );
  }
}


export default App;
