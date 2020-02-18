import React, {Component} from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Settings.css';

const schema = yup.object({
    password : yup.string()
    .max(25, "Password must be less than 25 characters")
    .required("Required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Does not match password")
    .required("Required")
})

class Email extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        document.body.style.backgroundColor="#c1f0f0";
    }
    render(){
        return(
            <Container className="passwordMain p-3 col-4">
                <p style={{textAlign:"center", fontFamily: "Bangers, cursive", fontSize: "300%"}}>Password Change</p>
                <Formik
                  initialValues={{password:"", confirmPassword: ""}}
                  onSubmit={(values, {setSubmitting}) => {
                    var pw = ""
                    for(var x = 0; x < values.password.length; x++)
                        pw = pw.concat("*");
                    this.props.history.push("/userdashboard", {password: pw});
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
                        <Form.Group controlId="formChangePassword">
                            <Form.Control
                            type="password"
                            placeholder="Enter Your New Password"
                            name="password"
                            size="lg"
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
                             size="lg"
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
                            <Col>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                            <Button variant="outline-danger" href="/Settings" style={{marginRight:"2.5%"}}>
                                Back
                            </Button>
                        </Row>
                    </Form>
                )}
                </Formik>
            </Container>
        )
    }
}

export default Email;