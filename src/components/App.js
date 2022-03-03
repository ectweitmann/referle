import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../styles/App.css';

const App = () => {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render= { () => <Home /> } />
        <Route exact path="/wordbank" render= { () => <WordBank /> } />
        <Redirect to='/' />
      </Switch>
    </div>
    )
}


export default App;
