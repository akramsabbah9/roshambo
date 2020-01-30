import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Formik, ErrorMessage, Field} from 'formik';
import * as yup from 'yup';
import './Pages.css';

// const handleClick = () => {
//   this.props.history.push('/HelloWorld');
// }

const schema = yup.object({
  username : yup.string().required("Required"),
  password : yup.string().required("Required")
});

class LoginPage extends Component{
  componentDidMount() {
    document.body.style.backgroundColor = '#e1edfc';
  }
  render(){
  return (
    <Container className="main border rounded p-3 mid col-5">
      <p className="sign">Sign In</p>
      <Formik
        initialValues = {{username: '', password: ''}}
        // validate = {values => {
        //   let errors = {};
        //   if(!values.username){
        //     errors.username = "Required";
        //   }else if(!/^[A-Z0-9]/i.test(values.username)){ 
        //     errors.username = "Username has to start with an alphanumeric character";
        //   }else if(values.username.length < 3){
        //     errors.username = "The length of username must be larger or equal to 3";
        //   }

        //   if(!values.password){
        //     errors.password = "Required";
        //   }else if(values.password.length < 5){
        //     errors.password = "The length of password must be larger or equal to 5";
        //   }
        //   return errors;
        // }}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2)); //Can do some encryption here to showcase security.
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
          <Col>
          <Form.Group controlId = "Username">
            <Form.Control 
              type="text" 
              className="unpw" 
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={(touched.username && errors.username)}
            />
            
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="Password">
            <Form.Control 
              type="password"
              placeholder="Password" 
              className="unpw" 
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={(touched.password && errors.password)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
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
