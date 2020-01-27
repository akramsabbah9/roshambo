import React from 'react';
import {browserHistory, BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import Another from '../../components/HelloWorld/Another';
import LoginPage from '../../components/LoginPage';
import Register from '../../components/LoginPage';


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
