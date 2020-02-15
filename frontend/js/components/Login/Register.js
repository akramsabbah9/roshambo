import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col, Nav, Navbar} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Pages.css';
import { connect } from 'react-redux';
import { usersActions, userActions } from '../../redux/actions/UsersActions';

const schema = yup.object({
    first_name : yup.string()
    .matches(/\D+/, "firstName cannot contain digits")
    .min(2, "firstName must be at least 2 letters")
    .max(50, "firstName must not be longer than 50 letters")
    .required("Required"),
    last_name : yup.string()
    .matches(/[A-Za-z0-9]/, "lastName can only contains alphanumeric letters")
    .max(100, "lastName must not be longer than 100 letters")
    .required("Required"),
    email: yup.string()
    .email("Must be a valid email address")
    .max(25, "Email must be less than 25 characters")
    .required("Required"),
    username : yup.string()
    .matches(/^\D/, "username must start with an alphabet letter")
    .min(5, "username must be at least 5 characters long")
    .max(30, "username cannot exceed 30 characters")
    .required("Required"),
    password : yup.string()
    .matches(/^\D/, "password must start with an alphabet letter")
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
    render(){
    return (
      <div>
        <Nav variant="pills" onSelect={this.onSelect}>
          <Nav.Item>
            <Nav.Link className="sign" href="/">ROSHAMBO</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container className="main border rounded p-3 mid col-5">
          <Formik
            initialValues={{first_name:"", last_name:"", email:"", username:"", password:"", confirmPassword: ""}}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values))
                this.props.registerUser(values)
                
                //this.props.history.push("/Login");
                //document.body.style.backgroundColor = 'white';
              }}
            validationSchema={schema}
          >
        {({isSubmitting,
           errors,
           touched,
           handleChange,
           handleSubmit,
           values,
           handleBlur
          }) => (
            <Form onSubmit={handleSubmit}>
                <p className="sign">Register</p>
                <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    className="inputbox"
                    name="first_name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={(touched.firstName && errors.firstName)}
                    />
                   <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                   </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    className="inputbox"
                    name="last_name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={(touched.lastName && errors.lastName)}
                    />
                   <Form.Control.Feedback type="invalid">
                        {errors.lastName}
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
                 
                </Col>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
                <Button variant="primary" type="submit" className="offset-lg-5 button" disabled={isSubmitting}>
                    Submit
                </Button>
              </Form>
            )}
            </Formik>
        </Container>
        </div>
    );
    }
}

function mapStateToProps (state) {
  return {}
}

const actionCreators = {
  registerUser: userActions.register,
}

export default connect(mapStateToProps, actionCreators)(Register);