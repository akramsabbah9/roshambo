import React, {Component} from 'react';
import {Navbar, Button, Container, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeHolder from 'file-loader!../src/placeholder.png';

class Settings extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <Container>
                <Navbar bg="light">
                    <Navbar.Brand style={{marginLeft:8, fontFamily:"'Bangers', cursive", fontSize:"30px"}}href="/">Roshambo</Navbar.Brand>
                    <Button style={{marginLeft:'76%', justifyCenter:'Center'}} variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                </Navbar>
                <Row style={{marginTop: "5%"}}>
                    <Col sm={{offset: 4}}>
                        <Card style={{width: '18rem', height: '18rem'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'Center'}}>User Profile</Card.Title>
                            <Card.Img src={placeHolder} style={{width: '12rem', height: '12rem', marginLeft: '13.5%'}} alt="Card image" roundedCircle/>
                            <Card.Text>
                            This is you
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: "5%"}}>
                    <Col>
                        <Card style={{width: '18rem', height: '18rem', borderStyle: 'hidden'}}>
                            <Card.Title style={{textAlign: "Center", fontFamily:'Raleway, sans-serif', fontSize: '2rem'}}>Basic Info</Card.Title>
                        </Card>
                    </Col>   
                    <Col>
                        <Card style={{width: '18rem', height: '18rem', borderStyle: 'hidden'}}>
                            <Card.Title  style={{textAlign: "Center", fontFamily:'Raleway, sans-serif', fontSize: '2rem'}}>Payment Settings</Card.Title>
                        </Card>
                    </Col>   
                    <Col>
                        <Card style={{width: '18rem', height: '18rem', borderStyle: 'hidden'}}>
                            <Card.Title  style={{textAlign: "Center",  fontFamily:'Raleway, sans-serif', fontSize: '2rem'}}>Privacy Settings</Card.Title>
                        </Card>
                    </Col>   
                </Row>
            </Container>
        );
    }
}
export default Settings;