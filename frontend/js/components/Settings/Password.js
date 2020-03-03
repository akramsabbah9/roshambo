import React, {Component} from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import { userActions } from '../../redux/actions/UsersActions';
import { connect } from 'react-redux';
import './Settings.css';
import '../Fonts.css'


const schema = yup.object({
    password : yup.string()
    .max(25, "Password must be less than 25 characters")
    .required("Required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Does not match password")
    .required("Required")
})

class Email extends Component{
    constructor(props){
        super(props)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    componentDidMount(){
        document.body.style.backgroundColor="#c1f0f0";
    }

    handleChangePassword(password) {
        this.props.changePassword(password)
    }
    handleGoBack() {
        this.props.history.goBack()
    }
    render(){
        return(
            <Container className="passwordMain p-3 col-4">
                <p style={{textAlign:"center", fontFamily: "Bangers, cursive", fontSize: "300%"}}>Password Change</p>
                <Formik
                  initialValues={{password:"", confirmPassword: ""}}
                  onSubmit={(values) => {
                   this.handleChangePassword(values.password)
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
                        <Row className="Buttons">
                            <Col>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                            <Button variant="danger" onClick={this.handleGoBack} style={{marginRight:"2.5%"}}>
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

function mapStateToProps (state) {
    return {}
}

const actionCreators = {
    changePassword: userActions.changePassword
}

export default connect(mapStateToProps, actionCreators)(Email);