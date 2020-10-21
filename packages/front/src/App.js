import React from 'react';
import './App.less';
import Dashboard from './Dashboard/Dashboard.js';
import About from './About/About.js';
import LandingPage from "./LandingPage/LandingPage";
//import Underconstruction from './Underconstruction';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayout from './Containers/MainLayout';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/dashboard">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>
        <Route exact path="/about">
          <MainLayout>
            <About />
          </MainLayout>
        </Route>
        {/* <Route exact path="/project/compound">
          <MainLayout>
            <Underconstruction />
          </MainLayout>
        </Route>
        <Route exact path="/project/uniswap">
          <MainLayout>
            <Underconstruction />
          </MainLayout>
        </Route> */}
      </Switch>
    </Router>);
}

export default App;
