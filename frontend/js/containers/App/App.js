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
import Payment from '../../components/Payment/AkramPayment';
import OnlineStore from '../../components/Store/Store';
import Appearance from '../../components/Settings/Appearance';
import Guild from '../../components/Settings/Guild';;
import Erehwon from '../../components/404 Page/404page';
import { PrivateRoute, HomeRoute } from '../../components/PrivateRoute/PrivateRoute';
import { history } from '../../utils/history';




const App = () => (
  <Router history={history}>
    <Switch>
        <HomeRoute exact path="/" component={Menu}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/login" component={LoginPage}/>
        <PrivateRoute exact path="/UserDashBoard" component={UserDashBoard} />   
        <PrivateRoute exact path="/GameLobby" component={GameLobby} />  
        <PrivateRoute exact path="/GamePage" component={GamePage} />
        <PrivateRoute exact path="/Settings" component={Settings} />  
        <PrivateRoute exact path="/Settings/Password" component={Password} />
        <PrivateRoute exact path="/Settings/Email" component={Email} />    
        <PrivateRoute exact path="/Settings/Skin" component={Appearance} />  
        <PrivateRoute exact path="/Settings/Guild" component={Guild} />  
        <PrivateRoute exact path="/Betting" component={BettingPage} />
        <PrivateRoute exact path="/Payment" component={Payment} />
        <PrivateRoute exact path="/Store" component={OnlineStore} />
        <Route component={Erehwon}/>
    </Switch>
  </Router>
);

export default App;
