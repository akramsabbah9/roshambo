import React from 'react';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import LoginPage from '../../components/LoginPage/index';
import Register from '../../components/LoginPage/Register';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/Register" component={Register}/>
    </Switch>
  </BrowserRouter>
);

export default App;
