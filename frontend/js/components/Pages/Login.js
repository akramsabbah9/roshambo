import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Pages.css';
import {axios} from 'axios';


// const handleClick = () => {
//   this.props.history.push('/HelloWorld');
// }

const schema = yup.object({
  password : yup.string().required("Required"),
  email: yup.string()
  .email("Must be a valid email address")
  .max(50, "Email must be less than 50 characters")
  .required("Required")
});

class Login extends Component{
  componentDidMount() {
    document.body.style.backgroundColor = '#e1edfc';
  }
  constructor(){
    super();
  }

  render(){
  return (
    <>
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link className="sign" href="/">ROSHAMBO</Nav.Link>
      </Nav.Item>
    </Nav>
    <Container className="main border rounded p-3 mid col-4">
      <p className="sign">Sign In</p>
      <Formik
        initialValues = {{email: '', password: ''}}

        onSubmit={values => {
          // axios.post('/Test',{
          //   username: values.username,
          //   password: values.password
          // })
          // .then( res => () => {
          // console.log(`Status code: ${res.status}`)
          // console.log(`Status text: ${res.statusText}`)
          // console.log(`Request method: ${res.request.method}`)
          // console.log(`Path: ${res.request.path}`)
          // console.log(`Date: ${res.headers.date}`)
          // console.log(`Data: ${res.data}`)})
          // .catch(function (error) {
          //   console.log(error);
          // });
          this.props.history.push("/UserDashBoard");
          document.body.style.backgroundColor = 'white';
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
              type="email" 
              className="inputbox" 
              name="email"
              placeholder="Email"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={(touched.email && errors.email)}
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
        <Button variant="primary" type="submit" className="offset-md-3 button">
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
    </>
  );
  }
}

export default Login;
