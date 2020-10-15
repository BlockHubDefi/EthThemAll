import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyPage from './MyPage/MyPage.js';
import Public from './Public/Public.js';
import About from './About/About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
          <div>
          <header>
            <ul>
              <li>
                <Link to="/MyPage">MyPage</Link>
              </li>
              <li>
                <Link to="/Public">Public</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
            </ul>
            </header>
            <hr />
            <Switch>
              <Route exact path="/MyPage">
                <MyPage />
              </Route>
              <Route exact path="/Public">
                <Public />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
