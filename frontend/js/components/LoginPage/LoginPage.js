import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Formik, ErrorMessage} from 'formik';
import './Pages.css'

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
      <p className="sign">Sign In</p>
      <Formik
        initialValues = {{username: '', password: ''}}
        validate = {values => {
          let errors = {};
          if(!values.username){
            errors.username = "Required";
          }else if(!/^[A-Z0-9]+.+/i.test(values.username)){ 
            errors.username = "UserName has to start with alphanumeric numbers";
          }else if(values.username.length < 3){
            errors.username = "The length of email must be larger or equal to 3";
          }

          if(!values.password){
            errors.password = "Required";
          }else if(values.password.length < 5){
            errors.password = "The length of password must be larger or equal to 5";
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2)); //Can do some encryption here to showcase security.
            setSubmitting(false);
          }, 400)
        }}
      >
        {({isSubmitting}) => (
          <Form>
          <Col>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" placeholder="Username" className="unpw" name="username"/>
          </Form.Group>
          <ErrorMessage name="username" component="div"/>
          </Col>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" className="unpw" name="password"/>
          </Form.Group>
          <ErrorMessage name="password" component="div"/>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          </Col>
        <Button variant="primary" type="submit" className="offset-md-3 button" disabled={isSubmitting}>
          Submit
        </Button>
          <Link to="/Register" className="offset-md-2">
            <Button className="button">
             Register
            </Button>
          </Link>
      </Form>

        )}

      </Formik>
    </Container>
  );
  }
}

export default LoginPage;
