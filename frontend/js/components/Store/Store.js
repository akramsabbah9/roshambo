import React, { Component } from 'react';
import { Container, Navbar, Button, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { skins } from '../Settings/Skins';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions/UsersActions';
import "../Fonts.css";



class OnlineStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: skins,
            toPurchase: null
        }

        this.handleSignOut = this.handleSignOut.bind(this)
        this.handlePurchase = this.handlePurchase.bind(this)
        this.handleAkramPurchase = this.handleAkramPurchase.bind(this)
    }

    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }

    handlePurchase(product) {
        const paymentProps = {
            type: "Custom Skin",
            description: product.name,
            id: product.id,
            price: product.price
        }
        
        history.push('/payment', paymentProps)
    }

    handleAkramPurchase() {
        const paymentProps = {
            type: "Akram Bucks",
            description: "℟ 5 Akram Bucks",
            id: null,
            price: 500
        }
        
        history.push('/payment', paymentProps)
    }

    handleSignOut(e) {
        e.preventDefault();
        this.props.logout()
    }

    addProductCards(products) {
        const cards = products.map((product, index) => (
            <Col key={index}>
                <Card>
                    <Card.Header className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon style={product.avatar.style} icon={product.avatar.name} size='7x'/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        { (this.props.ownedSkins.some(ownedSkin => ownedSkin == product.id)) 
                            ? <h3>Owned</h3>
                            : <h3>℟ {product.price}.00</h3>
                        }
                        <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="col d-flex align-items-center justify-content-center">
                        <Button className="Buttons" variant="outline-primary"
                         onClick={() => this.handlePurchase(product)} disabled={this.props.ownedSkins.some(ownedSkin => ownedSkin == product.id)}>Buy using Akram Bucks</Button>
                    </Card.Footer>
                </Card>
                <div style={{margin:50}} />
            </Col>
           
        ))

        return cards
    }

    render() {
        const products= this.state.products.filter((product) => {
            if (product.id != 0)
                return product
        })
        const { user } = this.props
        return(
            <Container className="Words">
                <Navbar bg="light" className="Buttons"> 
                    <Link to='/userdashboard'>       
                        <Navbar.Brand style={{fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>  
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Col>
                    <h1 style={{marginTop:10, marginBottom: 10}}>Store</h1>
                    <h2 style={{marginTop:10, marginBottom: 30}}>Your Akram Bucks ℟ {user.cash}.00</h2>
                </Col>
                    {this.addProductCards(products)}
                <Col>
                    <Card>
                        <Card.Header className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon style={{color: 'green'}} icon={faMoneyBillWave} size='7x'/>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Purchase 5 Akram Bucks</Card.Title>
                            <h3>$ 5.00</h3>
                            <Card.Text>Add 5 more Akram bucks to your wallet to purchase skins and bet agianst opponents.</Card.Text>
                        </Card.Body>
                        <Card.Footer className="col d-flex align-items-center justify-content-center">
                            <Button className="Buttons" variant="outline-primary"
                            onClick={() => this.handleAkramPurchase()}>Buy</Button>
                        </Card.Footer>
                    </Card>
                    <div style={{margin:50}} />
                </Col>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    const { ownedSkins } = state.skins;
    const user = state.user.currentUser
    return { ownedSkins, user }
}

const actionCreators = {
    logout: userActions.logout
}

export default connect(mapStateToProps, actionCreators)(OnlineStore);