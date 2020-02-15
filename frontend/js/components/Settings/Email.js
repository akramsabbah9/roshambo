import React, {Component} from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import './Settings.css';

const schema = yup.object({
    email : yup.string()
    .email("Must be a valid email address")
    .max(25, "Email must be less than 25 characters")
    .required("Required")
})

class Email extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        document.body.style.backgroundColor="#ecc6ec";
    }
    render(){
        return(
            <Container className="emailMain p-3 col-4">
                <p style={{textAlign:"center", fontFamily: "Bangers, cursive", fontSize: "300%"}}>Email Change</p>
                <Formik
                  initialValues={{email:""}}
                  onSubmit={(values, {setSubmitting}) => {
                    this.props.history.push("/userdashboard", {email: values.email});
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
                        <Form.Group controlId="formChangeEmail">
                            <Form.Control
                            type="email"
                            placeholder="Enter Your New Email"
                            name="email"
                            size="lg"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                            /> 
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
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