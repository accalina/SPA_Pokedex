import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import Home from './components/Home.js'
import Detail from './components/Detail.js'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/:pokename" component={Detail}></Route>
        </Switch>
      </div>
    </Router>
  );
}
