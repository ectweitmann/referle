import React from 'react';
import Header from './Header';
import Home from './Home';
import WordBank from './WordBank';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../styles/App.css';

const App = () => {
  return (
    <div className="App">
      {/*}<Header />*/}
      <h1>Hello world</h1>
      <Switch>
        <Route exact path="/" render= { () => <Home /> } />
        <Route exact path="/wordbank" render= { () => <WordBank /> } />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}


export default App;
