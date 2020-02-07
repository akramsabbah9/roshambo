import React, {Component} from 'react';
import {Navbar, Button, Container, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeHolder from 'file-loader!../src/placeholder.png';
import './Settings.css';

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
                        <Card className="SettingCards">
                                <Card.Title className="CardTitle">Basic Info</Card.Title>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Name</Card.Link>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Email</Card.Link>
                        </Card>
                    </Col>   
                    <Col>
                        <Card className="SettingCards">
                            <Card.Title className="CardTitle">Payment Settings</Card.Title>
                            <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Credit Cards</Card.Link>
                        </Card>
                    </Col>   
                    <Col>
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Privacy Settings</Card.Title>
                            <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Email Preferences</Card.Link>
                            <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Display Settings</Card.Link>
                            <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Password</Card.Link>
                        </Card>
                    </Col>   
                </Row>
            </Container>
        );
    }
}

export default Settings;