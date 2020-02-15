import React, {Component} from 'react';
import {Navbar, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeHolder from 'file-loader!../src/placeholder.png';
import './Settings.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Settings extends Component{
    constructor(props){
        super();
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }

    handleSignOut(e){
        e.preventDefault();
        this.props.history.push('/login');
    }

    render(){
        const { user } = this.props
        return (
            <Container>
                <Navbar bg="light">
                    <Link to='/userdashboard'>    
                        <Navbar.Brand style={{marginLeft:8, fontFamily:"'Bangers', cursive", fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>
                    <Button style={{marginLeft:'76%', justifyCenter:'Center'}} variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                </Navbar>
                <Row style={{marginTop: "5%"}}>
                    <Col sm={{offset: 4}}>
                        <Card style={{width: '18rem', height: '18rem'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'Center'}}>User Profile</Card.Title>
                            <Card.Img src={placeHolder} style={{width: '12rem', height: '12rem', marginLeft: '13.5%'}} alt="Card image" />
                            <Card.Text className="col d-flex align-items-center justify-content-center">
                            Welcome {user.name}!
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: "5%"}}>
                    <Col >
                        <Card className="SettingCards">
                                <Card.Title className="CardTitle">Basic Info</Card.Title>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Name: {user.name}</Card.Link>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Email: {user.email}</Card.Link>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Privacy Settings</Card.Title>
                            <Link to='/Settings/Email' className="CardLinks" style={{margin:"0.25em auto"}}>Email</Link>
                            <Link to='/Settings/Password' className="CardLinks" style={{margin:"0.25em auto"}}>Password</Link>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Appearance</Card.Title>
                            <Link to='/Settings/Skin' className="CardLinks" style={{margin:"0.25em auto"}}>Skins</Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps (state) {
   const { user } = state.auth

   return { user }
}



export default connect(mapStateToProps)(Settings);

/*
sm={{offset: 3, span: 3}}

*/