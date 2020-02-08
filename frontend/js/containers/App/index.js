import React, { Component } from 'react';

import LoginForm from '../../components/LoginForm';
import NavHeader from '../../components/NavHeader';
import SignupForm from '../../components/SignupForm';

import {currentUser, login, signup, logout, allUsers, activeUsers} from '../../utils/api';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      currentUser().then(json => {
        this.setState({ username: json.username });
      });
    }
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    login(data).then(json => {
      localStorage.setItem('token', json.token);
      allUsers().then(json => {console.log(json)})
      activeUsers().then(json => {console.log(json)})
      currentUser().then(json => {
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
    });
  };

  handleSignup = (e, data) => {
    e.preventDefault();
    signup(data).then(json => {
      localStorage.setItem('token', json.token);
      this.setState({
        logged_in: true,
        displayed_form: '',
        username: json.username
      });
    });
  };

  handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem('token');
      this.setState({ ...this.state, logged_in: false, username: '' });
    });
  };

  displayForm = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    let header;
    switch (this.state.displayed_form) {
      case 'login':
        header = <h3>Please log in...</h3>
        form = <LoginForm handleLogin={this.handleLogin} />;
        break;
      case 'signup':
        header = <h3>Please sign up...</h3>
        form = <SignupForm handleSignup={this.handleSignup} />;
        break;
      default:
        form = <h3>Home page!</h3>;
        header = null;
    }

    return (
      <React.Fragment>
        <NavHeader
          loggedIn={this.state.logged_in}
          displayForm={this.displayForm}
          handleLogout={this.handleLogout}
        />
        {header}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : null }
        </h3>
        {form}
      </React.Fragment>
    );
  }
}

export default App;
