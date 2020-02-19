import React, {Component} from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import { userActions } from '../../redux/actions/UsersActions';
import { connect } from 'react-redux';
import './Settings.css';
import '../Fonts.css';

const schema = yup.object({
    guild : yup.string()
    .max(25, "Guild name must be less than 25 characters")
    .required("Required")
})

class Guild extends Component{
    constructor(props){
        super(props)
        this.handleGuildChange = this.handleGuildChange.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    componentDidMount(){
        document.body.style.backgroundColor="#8EE3EF";
    }

    handleGuildChange(guild) {
        this.props.changeGuild(guild)
    }
    handleGoBack() {
        this.props.history.goBack()
    }
    render(){
        return(
            <Container className="emailMain p-3 col-4">
                <p style={{textAlign:"center", fontFamily: "Bangers, cursive", fontSize: "300%"}}>Guild Change</p>
                <Formik
                  initialValues={{guild:""}}
                  onSubmit={(values, {setSubmitting}) => {

                    //document.body.style.backgroundColor = 'white';
                    this.handleGuildChange(values.guild)
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
                        <Form.Group controlId="formChangeGuild">
                            <Form.Control
                            type="text"
                            placeholder="Enter Your New Guild"
                            name="guild"
                            size="lg"
                            value={values.guild}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.guild && errors.guild}
                            /> 
                            <Form.Control.Feedback type="invalid">
                                {errors.guild}
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

function mapStateToProps(state) {
    return {}
}

const actionCreators = {
    changeGuild: userActions.changeGuild,
}

export default connect(mapStateToProps, actionCreators)(Guild);