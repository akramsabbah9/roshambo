import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import './Pages.css';

class Register extends Component{
    componentDidMount() {
        document.body.style.backgroundColor = '#fcc092';
    }
    render(){
    return (
        <Container className="main border rounded p-3 mid col-4">
        <Form>
            <p className="sign">Register</p>
            <Col>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" className="unpw"/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            </Col>
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
            <Button variant="primary" type="submit" className="offset-md-5 button">
                Submit
            </Button>
        </Form>
        </Container>
    );
    }
}

export default Register;