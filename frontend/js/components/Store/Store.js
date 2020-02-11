import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo, faKiwiBird, faOtter } from "@fortawesome/free-solid-svg-icons";

const dummyProducts = [
    {
        name: "Lion in Lair Skin",
        description: "Bring fierceness with Lion in Lair skin",
        price: 5
    },{
        name: "Princess Smoothie Skin",
        description: "Show off attitude and spunk with Princess Smoothie skin",
        price: 5
    },{
        name: "Angry Henery Skin",
        description: "Show your opponent's you mean strictly business with Angry Henery skin",
        price: 5
    },
]

class OnlineStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: dummyProducts,
            toPurchase: null
        }
    }



    handlePurchase(product) {
        const paymentProps = {
            type: "Custom Skin",
            description: product.name,
            price: product.price
        }

        this.props.history.push('/payment', paymentProps)
    }

    addProductCards(products) {
        const icons = [faOtter, faHippo, faKiwiBird]
        const cards = products.map((product, index) => (
            <Col key={index}>
                <Card>
                    <Card.Header className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={icons[index]} size='10x'/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <h3>${product.price}.00</h3>
                        <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="col d-flex align-items-center justify-content-center">
                        <Button onClick={() => this.handlePurchase(product)}>Buy</Button>
                    </Card.Footer>
                </Card>
                <div style={{margin:50}} />
            </Col>
           
        ))

        return cards
    }

    render() {
        return(
            <Container>
                <Navbar bg="light">       
                    <Navbar.Brand style={{marginLeft:8}}>Roshambo</Navbar.Brand>
                </Navbar>
                <Col>
                    <h1 style={{marginTop:10, marginBottom: 10}}>Store</h1>
                </Col>
                    {this.addProductCards(this.state.products)}
            </Container>
        )
    }
}

export default OnlineStore;