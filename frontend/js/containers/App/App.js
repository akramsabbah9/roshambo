import React from 'react';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import LoginPage from '../../components/LoginPage/LoginPage';
import Register from '../../components/LoginPage/Register';
import Menu from '../../components/Menu'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Menu}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/Login" component={LoginPage}/>
    </Switch>
  </BrowserRouter>
);

export default App;
