import React from 'react';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import LoginPage from '../../components/LoginPage';
import HelloWorld from '../../components/HelloWorld/HelloWorld';

const App = () => (
  <BrowserRouter>
      <Route exact path="/">
        <LoginPage/>
      </Route>
      <Route path="/HelloWorld">
        <HelloWorld/>
      </Route>
  </BrowserRouter>
);

export default App;
