import React from 'react';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import LoginPage from '../../components/Pages/Login';
import Register from '../../components/Pages/Register';
import Menu from '../../components/Menu/Menu';
import GameLobby from '../../components/Game/GameLobby';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';
import GamePage from '../../components/Game/GamePage';
import Settings from '../../components/Settings/Settings';
import Password from '../../components/Settings/Password';
import Email from '../../components/Settings/Email';

const App = () => (
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Menu}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/UserDashBoard" component={UserDashBoard} />   
        <Route exact path="/GameLobby" component={GameLobby} />  
        <Route exact path="/GamePage" component={GamePage} />
        <Route exact path="/Settings" component={Settings} />  
        <Route exact path="/Settings/Password" component={Password} />
        <Route exact path="/Settings/Email" component={Email} />    
    </Switch>
  </BrowserRouter>
);

export default App;

