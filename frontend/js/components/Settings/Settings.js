import React, {Component} from 'react';
import {Navbar, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeHolder from 'file-loader!../src/placeholder.png';
import './Settings.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Fonts.css';

class Settings extends Component{
    constructor(props){
        super(props);
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
            <Container className="Words">
                <Navbar bg="light" className="Buttons">
                    <Link to='/userdashboard'>    
                        <Navbar.Brand style={{fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Row style={{marginTop: "5%"}}>
                    <Col className="d-flex align-items-center justify-content-center">
                        <Card style={{width: '18rem', height: '18rem'}} >
                        <Card.Body>
                            <Card.Title style={{textAlign: 'Center'}}>User Profile</Card.Title>
                            <Card.Img src={placeHolder} style={{width: '12rem', height: '12rem', marginLeft:"13.5%"}} alt="Card image" />
                            <Card.Text>
                            Welcome {user.username}!
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: "5%"}}>
                    <Col md={4} className="d-flex justify-content-center">
                        <Card className="SettingCards">
                                <Card.Title className="CardTitle">Basic Info</Card.Title>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Name: {user.username}</Card.Link>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Email: {user.email}</Card.Link>
                        </Card>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Privacy Settings</Card.Title>
                            <Link to='/Settings/Email' className="CardLinks" style={{margin:"0.25em auto"}}>Email</Link>
                            <Link to='/Settings/Password' className="CardLinks" style={{margin:"0.25em auto"}}>Password</Link>
                        </Card>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
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
   const user = state.user.currentUser
   return { user }
}

export default connect(mapStateToProps)(Settings);

