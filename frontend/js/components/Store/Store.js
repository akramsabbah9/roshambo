import React, { Component } from 'react';
import { Container, Navbar, Button, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skins } from '../Settings/Skins';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import { connect } from 'react-redux';
import "../Game.css"
import { userActions } from '../../redux/actions/UsersActions';


/* 
    To Do:

    - add logic for already owned skins
        - can not but already owned skins
        - connect redux for ownedSkins
        - disable button if is owned skin


*/


class OnlineStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: skins,
            toPurchase: null
        }

        this.handleSignOut = this.handleSignOut.bind(this)
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

        this.props.history.push('/payment', paymentProps)
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
                            : <h3>${product.price}.00</h3>
                        }
                        <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="col d-flex align-items-center justify-content-center">
                        <Button className="Buttons" variant="outline-primary"
                         onClick={() => this.handlePurchase(product)} disabled={this.props.ownedSkins.some(ownedSkin => ownedSkin == product.id)}>Buy</Button>
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
                </Col>
                    {this.addProductCards(products)}
            </Container>
        )
    }
}

function mapStateToProps (state) {
    const { ownedSkins } = state.skins;
    return { ownedSkins }
}

const actionCreators = {
    logout: userActions.logout
}

export default connect(mapStateToProps, actionCreators)(OnlineStore);