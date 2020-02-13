import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../../components/Login/Login';
import Register from '../../components/Login/Register';
import Menu from '../../components/Menu/Menu';
import GameLobby from '../../components/Game/GameLobby';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';
import GamePage from '../../components/Game/GamePage';
import Settings from '../../components/Settings/Settings';
import Password from '../../components/Settings/Password';
import Email from '../../components/Settings/Email';
import BettingPage from '../../components/Betting/BettingPage';
import Payment from '../../components/Payment/payment';
import OnlineStore from '../../components/Store/Store';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';
import { history } from '../../utils/history';



const App = () => (
  <Router history={history}>
    <Switch>
        <Route exact path="/" component={Menu}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/Login" component={LoginPage}/>
        <PrivateRoute exact path="/UserDashBoard" component={UserDashBoard} />   
        <PrivateRoute exact path="/GameLobby" component={GameLobby} />  
        <PrivateRoute exact path="/GamePage" component={GamePage} />
        <PrivateRoute exact path="/Settings" component={Settings} />  
        <PrivateRoute exact path="/Settings/Password" component={Password} />
        <PrivateRoute exact path="/Settings/Email" component={Email} />    
        <PrivateRoute exact path="/GamePage" component={GamePage} />   
        <PrivateRoute exact path="/Betting" component={BettingPage} />
        <PrivateRoute exact path="/Payment" component={Payment} />
        <PrivateRoute exact path="/Store" component={OnlineStore} />
    </Switch>
  </Router>
);

export default App;

