import React, { Component } from 'react';
import Header from './Header';
import NavModal from './NavModal';
import Home from './Home';
import WordBank from './WordBank';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }

  toggleNavModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal }
    });
  }

  render = () => {
    return (
      <div className="App">
        <Header toggleNavModal={this.toggleNavModal} />
        <NavModal showModal={this.state.showModal} toggleNavModal={this.toggleNavModal} />
        <Switch>
          <Route exact path="/home" render= { () => <Home /> } />
          <Route exact path="/wordbank" render= { () => <WordBank /> } />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


export default App;
