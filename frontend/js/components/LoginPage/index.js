import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './LoginPage.css'

// const handleClick = () => {
//   this.props.history.push('/HelloWorld');
// }


class LoginPage extends Component{
  componentDidMount() {
    document.body.style.backgroundColor = '#e1edfc';
  }
  render(){
  return (
    <Container className="main border rounded p-3 mid col-4">
      <Form>
        <p className="sign">Sign In</p>
          <Col>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" placeholder="Username" className="unpw"/>  
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" className="unpw"/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          </Col>
        <Button variant="primary" type="submit" className="offset-md-3 button">
          Submit
        </Button>
          <Link to="/Register" className="offset-md-2">
            <Button className="button">
             Register
            </Button>
          </Link>
      </Form>
    </Container>
  );
  }
}

export default LoginPage;
