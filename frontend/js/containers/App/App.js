import React from 'react';
<<<<<<< HEAD
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../../components/Pages/Login';
import Register from '../../components/Pages/Register';
import Menu from '../../components/Menu/Menu';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';
=======
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import LoginPage from '../../components/LoginPage/LoginPage';
import Register from '../../components/LoginPage/Register';
import Menu from '../../components/Menu';
import GameLobby from '../../components/Game/GameLobby';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';
import GamePage from '../../components/Game/GamePage';

>>>>>>> gamePage


const App = () => (
  <BrowserRouter>
    <Switch>
<<<<<<< HEAD
      <Route exact path="/" component={Menu}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/UserDashBoard" component={UserDashBoard}/>
=======
        <Route exact path="/" component={Menu}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/UserDashBoard" component={UserDashBoard} />   
        <Route exact path="/GameLobby" component={GameLobby} />  
        <Route exact path="/GamePage" component={GamePage} />   
>>>>>>> gamePage
    </Switch>
  </BrowserRouter>
);

export default App;

