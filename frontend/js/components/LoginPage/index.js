import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link, Router, Route, BrowserRouter, Switch} from 'react-router-dom';
import './LoginPage.css'


const LoginPage = () => {
  return (
    <Container className="border rounded p-3 mid col-5">
      <Form>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username"/>  
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          </Col>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/HelloWorld" class="offset-md-2">Register</Link>
      </Form>
    </Container>
  );
}

export default LoginPage;
