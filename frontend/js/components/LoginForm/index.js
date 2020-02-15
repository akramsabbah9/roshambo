import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';

const propTypes = {
  handleLogin: PropTypes.func.isRequired
};

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" onChange={this.handleChange} placeholder="roshambolicious@roshambo.org" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" onChange={this.handleChange} type="password" placeholder="Password is not a good password." />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => this.props.handleLogin(e, this.state)}>
          Submit
        </Button>
      </Form>
    );
  }
}

LoginForm.propTypes = propTypes;

export default LoginForm;