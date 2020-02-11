import React, { Component } from 'react';
import { Container, Form, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const DummyData = [{
        type: "Bet",
        description: "In game bet",
        price: 50
    },{
        type: "Bet",
        description: "In game bet",
        price: 25
    }
]

const paymentValues = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ccNum: '',
    ccExpMo: '',
    ccExpYr: '',
    ccCode: '',
}

const stateCodes = [
"...","AK","AL","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY",
"LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND",
"OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
]

const validationSchema = yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().min(2,"2 letter state code").required("Required"),
    zipCode: yup.string().required("Required"),
    ccNum: yup.number().required("Required"),
    ccExpMo: yup.number().min(2,"2 number month").required("Required"),
    ccExpYr: yup.number().min(4,"4 number year").required("Required"),
    ccCode: yup.number().min(3, "3 digit credit card code").required("Required"),
})

class PaymentPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            items:[{
                type: this.props.history.location.state.type,
                description: this.props.history.location.state.description,
                price: this.props.history.location.state.price,
            }]

        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    
        console.log(JSON.stringify(this.state))
    }

    handleSubmit(values) {
        // Process payment information here

        // Add logic for go back Store or Game Lobby
        this.props.history.push('/gameLobby')
    }

    handleCancel() {
        this.props.history.goBack()
    }

    fillPurchaseTable(items) {
        const tableItems = items.map((item, index) => (
            <tr key={index}>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>${item.price}.00</td>
            </tr>
        ))

        return tableItems
    }

    calculateTotal(items) {
        var total = 0

        for (var i=0; i < items.length; i++)
            total += items[i].price

        return total
    }

    renderStateOptions() {
        const states = stateCodes.map((code, index) =>
        <option key={index}>{code}</option>
        )

        return states;
    }

    render() {
        const styles = {
            checkOutBtn: {
                margin: 5,
            },
            cancelBtn: {
                marginLeft: 5,
            },
            total: {
                margin: 5,
                textAlign:'right',
                fontWeight: 'bold'
            }
        }

        const items = DummyData

        return(
            <Container>
                <Row className="col d-flex align-items-center justify-content-center">
                    <h1 style={{marginTop: 50}}>Checkout</h1>
                    <Card style={{margin: 50}}>
                    <Card.Body>
                    <Card.Title style={{marginTop:20}}>Items</Card.Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.fillPurchaseTable(this.state.items)}
                            </tbody>
                        </Table>
                        <p style={styles.total}>Total: ${this.calculateTotal(this.state.items)}.00</p>
                    <Card.Title style={{marginTop:75}}>Enter Payment Information</Card.Title>
                    <Formik
                        initialValues={paymentValues}
                        validationSchema = {validationSchema}
                        onSubmit = {(values) => this.handleSubmit(values)}
                    >
                    {({ errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        values,
                        handleBlur }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.firstName && errors.firstName)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.lastName && errors.lastName)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row>
                                <Form.Group as={Col} controlId="address">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="address"
                                    placeholder="Street address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.address && errors.address)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="city"
                                    placeholder="City"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.city && errors.city)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control 
                                    as="select"
                                    name="state"
                                    placeholder="State"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.state && errors.state)}
                                >
                                    {this.renderStateOptions()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.state}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="zipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    value={values.zipCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.zipCode && errors.zipCode)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.zipCode}
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                                <Form.Row>
                                <Form.Group as={Col} controlId="ccNum">
                                    <Form.Label>Credit Card No.</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="ccNum"
                                    placeholder="Credit Card Number"
                                    value={values.ccNum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.ccNum && errors.ccNum)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ccNum}
                                </Form.Control.Feedback>
                                </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="ccExpMo">
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="ccExpMo"
                                    placeholder="MM"
                                    value={values.ccExpMo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.ccExpMo && errors.ccExpMo)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ccExpMo}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style={{marginTop: '5.25%'}} as={Col} controlId="ccExpYr">
                                <Form.Control 
                                type="text" 
                                name="ccExpYr"
                                placeholder="YYYY"
                                value={values.ccExpYr}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={(touched.ccExpYr && errors.ccExpYr)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ccExpYr}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ccCode">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="ccCode"
                                    placeholder="3 Digit Code"
                                    value={values.ccCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.ccCode && errors.ccCode)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ccCode}
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <div style={{margin:50}} />
                            <Col className="col d-flex align-items-center justify-content-center">
                                <Button style={styles.checkOutBtn} variant="success" type="submit">Confirm</Button>
                                <Button style={styles.cancelBtn} variant="outline-danger" onClick={this.handleCancel}>Cancel</Button>
                            </Col>
                        </Form>
                    )}
                    </Formik>
                    </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }

}

export default PaymentPage;

