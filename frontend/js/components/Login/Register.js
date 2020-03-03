import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container,
         Col, Nav, Row } from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import {userActions } from '../../redux/actions/UsersActions';

import './Pages.css';
import '../Fonts.css';

const schema = yup.object({
    first_name : yup.string()
    .matches(/^\D+$/, "firstName can only contains English letters")
    .min(2, "firstName must be at least 2 letters")
    .max(50, "firstName must not be longer than 50 letters")
    .required("Required"),
    last_name : yup.string()
    .matches(/^\D+$/, "lastName can only contains English letters")
    .max(100, "lastName must not be longer than 100 letters")
    .required("Required"),
    email: yup.string()
    .email("Must be a valid email address")
    .max(25, "Email must be less than 25 characters")
    .required("Required"),
    username : yup.string()
    .matches(/^[a-zA-Z]/, "username must start with an alphabet letter")
    .matches(/^[0-9a-zA-Z!]+$/, "username must contain only alphanumeric letters and !")
    .min(5, "username must be at least 5 characters long")
    .max(30, "username cannot exceed 30 characters")
    .required("Required"),
    password : yup.string()
    .matches(/^[a-zA-Z]/, "password must start with an alphabet letter")
    .matches(/^[0-9a-zA-Z!]+$/, "password must contain only alphanumeric letters and !")
    .min(8, "password must be at least 8 characters long")
    .max(30, "password cannot exceed 30 characters")
    .required("Required"),
    confirmPassword : yup.string()
    .oneOf([yup.ref('password'), null], "Does not match with password")
    .required("Required")
});  

class Register extends Component{
    constructor(props){
      super();
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#fcc092';
    }

    buildErrorMessage (error) {
      return (
        <React.Fragment>
          {error.map((errorField) =>
            errorField
          )}
        </React.Fragment>
      )
  }
    render(){

    const { error } = this.props 
    
    return (
      <div>
        <Nav variant="pills" onSelect={this.onSelect}>
          <Nav.Item>
            <Nav.Link className="sign" href="/">ROSHAMBO</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container className="main border rounded mid p-3 Words">
          <Formik
            initialValues={{first_name:"", last_name:"", email:"", username:"", password:"", confirmPassword: ""}}
            onSubmit={(values) => {
                setTimeout(() => {this.props.registerUser(values)}, 500)
              }}
            validationSchema={schema}
          >
        {({
           errors,
           touched,
           handleChange,
           handleSubmit,
           values,
           handleBlur
          }) => (
            <Form onSubmit={handleSubmit}>
            <p className="sign">Register</p>
            <Form.Group controlId="formFirstName">
              <Form.Control 
                type="text" 
                placeholder="First Name" 
                className="inputbox"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={(touched.first_name && errors.first_name)}
                />
              <Form.Control.Feedback type="invalid">
                    {errors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Control 
                type="text" 
                placeholder="Last Name" 
                className="inputbox"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={(touched.last_name && errors.last_name)}
                />
              <Form.Control.Feedback type="invalid">
                    {errors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                  type="email" 
                  placeholder="Email" 
                  name="email"
                  className="inputbox"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formUsername">
                <Form.Control 
                  type="text" 
                  placeholder="Username"
                  name="username"
                  className="inputbox"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.username && errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
            </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className="inputbox"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="inputbox"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" type="submit" className="button">
                        Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
            </Formik>

            { error != null ? <h3 style={{color: "red"}}>{error.message}</h3> : null }

        </Container>
        </div>
    );
    }
}

function mapStateToProps (state) {
  const { error } = state.reg
  return { error }
}

const actionCreators = {
  registerUser: userActions.register,
}

export default connect(mapStateToProps, actionCreators)(Register);