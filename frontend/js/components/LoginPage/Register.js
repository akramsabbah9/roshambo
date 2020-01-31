import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Pages.css';

const schema = yup.object({
    firstName : yup.string()
    .matches(/\D+/, "firstName cannot contain digits")
    .min(2, "firstName must be at least 2 letters")
    .max(50, "firstName must not be longer than 50 letters")
    .required("Required"),
    lastName : yup.string()
    .matches(/[A-Za-z0-9]/, "lastName can only contains alphanumeric letters")
    .max(100, "lastName must not be longer than 100 letters")
    .required("Required"),
    email: yup.string()
    .email("Must be a valid email address")
    .max(50, "Email must be less than 50 characters")
    .required("Required"),
    phone: yup.string()
    .matches(/^(\+?\d)?\(\d{3}\)\d{3}-\d{4}$/, "phone number must be in the form of +x(xxx)xxx-xxxx")
    .required("Required"),
    username : yup.string()
    .matches(/^\D/, "username or password must start with an alphabet letter")
    .min(5, "username or password must be at least 5 letters long")
    .max(30, "username or password cannot exceed 30 characters")
    .required("Required"),
    password : yup.string()
    .matches(/^\D/, "username or password must start with an alphabet letter")
    .min(5, "username or password must be at least 5 letters long")
    .max(30, "username or password cannot exceed 30 characters")
    .required("Required")
});  

class Register extends Component{
    componentDidMount() {
        document.body.style.backgroundColor = '#fcc092';
    }
    render(){
    return (
        <Container className="main border rounded p-3 mid col-5">
          <Formik
            initialValues={{firstName:"", lastName:"", phone:"", email:"", username:"", password:""}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 6)); //Can do some encryption here to showcase security.
                  setSubmitting(false);
                }, 400)
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
                    name="firstName"
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
                    name="lastName"
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
                      onBlue={handleBlur}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                   </Form.Control.Feedback>
                </Form.Group>
                 
                </Col>
                <Col>
                  <Form.Group controlId="formPhone">
                      <Form.Control
                        type="text"
                        placeholder="(xxx)xxx-xxxx"
                        name="phone"
                        className="inputbox"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phone && errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.phone}
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
                        type="text" 
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
                <Button variant="primary" type="submit" className="offset-lg-5 button" disabled={isSubmitting}>
                    Submit
                </Button>
              </Form>
            )}
            </Formik>
        </Container>
    );
    }
}

export default Register;