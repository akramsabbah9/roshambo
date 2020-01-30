import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Formik} from 'formik';
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
              className="inputbox" 
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
              className="inputbox" 
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
