import React, { Component } from 'react';

import LoginForm from '../../components/LoginForm';
import NavHeader from '../../components/NavHeader';
import SignupForm from '../../components/SignupForm';
import EditForm from '../../components/EditForm';

import {currentUser, login, signup, logout, allUsers, activeUsers, editUser} from '../../utils/api';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      edit_results: ''
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
          username: json.username,
          edit_results: ''
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
        username: json.username,
        edit_results: ''
      });
    });
  };

  handleEdit = (e, data) => {
    e.preventDefault();
    let sendData = {};
    sendData[data['field-type']] = data['field-value'];
    console.log(sendData);
    editUser(sendData).then(json => {
      this.setState({
        display_form: 'edit',
        edit_results: JSON.stringify(json, null, 2)
      })
    })
  }

  handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem('token');
      this.setState({ ...this.state, logged_in: false, username: '', edit_results: '', display_form: '' });
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
      case 'edit':
        header = <h3>Edit your deets...</h3>
        form = <EditForm handleEdit={this.handleEdit} />;
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
          handleEdit={this.handleEdit}
        />
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : null }
        </h3>
        {header}
        {form}
        <p>{this.state.edit_results != '' ? this.state.edit_results : null}</p>

      </React.Fragment>
    );
  }
}

export default App;
