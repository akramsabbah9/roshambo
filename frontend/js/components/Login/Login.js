import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col, Row, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Pages.css';
import '../Fonts.css';


import { connect } from 'react-redux';
import { userActions } from '../../redux/actions/UsersActions';

const schema = yup.object({
  password : yup.string()
  .matches(/^[a-zA-Z]/, "password must start with an alphabet letter")
  .matches(/^[0-9a-zA-Z!]+$/, "password must contain only alphanumeric letters and !")
  .required("Required"),
  email: yup.string()
  .email("Must be a valid email address")
  .max(30, "Email must be less than 30 characters")
  .required("Required")
});

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      changed: false,
      loginerror: null
    };
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#e1edfc';
  }

  handleLogin(values){
    this.setState({submitted: true, changed: false});
    const { email, password } = values
    this.props.login(email, password)
  }

  render(){
  const {error} = this.props;
  return (
    <div>
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link className="sign" href="/">ROSHAMBO</Nav.Link>
      </Nav.Item>
    </Nav>
    <Container className="main border rounded mid p-3">
      <p className="sign">Sign In</p>
      <Formik
        initialValues = {{email: '', password: ''}}
        onSubmit={values => {
          this.handleLogin(values)
        }}
        validationSchema={schema}
      >
        {({isSubmitting,
           errors,
           touched,
           handleChange,
           handleSubmit,
           values,
           handleBlur,
          }) => (
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId = "Email">
            <Form.Control 
              type="email"
              className="inputbox" 
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={ (e) => {
                handleChange(e);
                this.setState({changed: true});
              }}
              onBlur={handleBlur}
              isInvalid={(touched.email && errors.email)}
            />
            
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Control 
              type="password"
              placeholder="Password" 
              className="inputbox" 
              name="password"
              value={values.password}
              onChange={ (e) => {
                handleChange(e);
                this.setState({changed: true});
              }}
              onBlur={handleBlur}
              isInvalid={(touched.password && errors.password)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        <Row>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="button">
              Submit
            </Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Link to="/Register">
              <Button className="button">
              Register
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
      )}
      </Formik>  
      {error != null && !this.state.changed ? <h3 className="Words" style={{fontSize: '17.5px', color: 'red', marginTop: '5%'}}>{error.response.status == 404 ? 'Username and/or password are incorrect.' : error.response.error}</h3> : null}    
    </Container>
    </div>
  );
  }
}

function mapState(state) {
  const { error } = state.auth;
  return { error };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
}


export default connect(mapState, actionCreators)(Login);
