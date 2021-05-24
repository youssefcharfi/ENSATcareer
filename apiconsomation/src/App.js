import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import signup from './components/signup';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/login' component={Login} />
          <Route path='/signup' component={signup} />
        </div>
      </Router>
    );
  }
}

export default App;
