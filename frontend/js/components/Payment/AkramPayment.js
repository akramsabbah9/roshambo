import React, { Component } from 'react';
import { Container, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { skinsActions } from '../../redux/actions/SkinsActions';
import { userActions } from '../../redux/actions/UsersActions';
import StripeCheckout from 'react-stripe-checkout';
import '../Fonts.css'



class PurchasePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items:[{
                type: this.props.history.location.state.type,
                description: this.props.history.location.state.description,
                price: this.props.history.location.state.price,
                id: this.props.history.location.state.id,
            }]

        }

        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
    }

    handleConfirm(e) {
        e.preventDefault()
        this.props.addSkin(id)
    }

    handleCancel(e) {
        e.preventDefault()
        this.props.history.goBack()
    }

    onToken = (token, addresses) => {
        this.props.addToWallet(token)
    }

    fillPurchaseTable(items) {
        const skinPurchase = "Custom Skin"
        const tableItems = items.map((item, index) => (
            <tr key={index}>
                <td>{item.type}</td>
                <td>{item.description}</td>
                {item.type == skinPurchase
                    ? <td>℟ {item.price}.00</td>
                    : <td>$ 5.00</td>
                }
                
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


    render() {
        const styles = {
            checkOutBtn: {
                marginTop: 20,
                
            },
            cancelBtn: {
                marginTop: 5,
                marginBottom: 20,
                width: '25%',
            },
            total: {
                margin: 5,
                textAlign:'right',
                fontWeight: 'bold'
            }
        }
        const { user } = this.props
        const { id, type, price } = this.state.items[0]
        const skinPurchase = "Custom Skin"

        console.log(id)

        return(
            <Container className="Words">
                <Row className="col d-flex align-items-center justify-content-center">
                    <h1 style={{marginTop: 50}}>Checkout</h1>
                    <Card style={{margin: 50}}>
                    <Card.Body>
                        <Card.Title>Your Wallet: ℟ {user.cash}.00</Card.Title>
                        <div style={{margin:30}} />
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
                            { type == skinPurchase 
                                ? <p style={styles.total}>Total: ℟ {this.calculateTotal(this.state.items)}.00</p>
                                : <p style={styles.total}>Total: $ 5.00</p>
                            }
                            
                    </Card.Body>
                    <Col className="col d-flex align-items-center justify-content-center">
                        { type == skinPurchase 
                            ? <Button variant="outline-success" style={styles.checkOutBtn} onClick={this.handleConfirm}>Confirm</Button>
                            : <StripeCheckout
                                    name="Purchase Akram Bucks"
                                    stripeKey="pk_test_Ux3dsI7uw62rLZ2Ni5TvoSV400Pjv0N2Sn"
                                    token={this.onToken}
                                    zipCode={true}
                                    email={false}
                                    amount={500}
                                    currency="USD"
                                />
                        }
                        
                    </Col>
                    <Col className="col d-flex align-items-center justify-content-center">
                        <Button variant="outline-danger" style={styles.cancelBtn} onClick={this.handleCancel}>Cancel</Button>
                    </Col>
                    </Card>
                </Row>
            </Container>
        )
    }

}

function mapStateToProps(state) {
    const { ownedSkins, activeSkin, error } = state.skins
    const user = state.user.currentUser
    return { ownedSkins, activeSkin, error, user }
}

const actionCreators = {
    addSkin: skinsActions.add,
    getUser: userActions.getCurrent,
    addToWallet: userActions.addToWallet,
}

export default connect(mapStateToProps,actionCreators)(PurchasePage);

