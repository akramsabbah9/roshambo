import React from 'react';
import {browserHistory, BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import Another from '../../components/HelloWorld/Another';
import LoginPage from '../../components/LoginPage/index';
import Register from '../../components/LoginPage/Register';


const App = () => (
  <BrowserRouter history={browserHistory}>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/HelloWorld/Another" component={Another}/>
    </Switch>
  </BrowserRouter>
);

export default App;
