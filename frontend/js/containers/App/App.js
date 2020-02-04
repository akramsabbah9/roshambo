import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../../components/Pages/Login';
import Register from '../../components/Pages/Register';
import Menu from '../../components/Menu/Menu';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Menu}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/UserDashBoard" component={UserDashBoard}/>
    </Switch>
  </BrowserRouter>
);

export default App;
