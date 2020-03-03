import React, {Component} from 'react';
import {Navbar, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions/UsersActions';
import { skinsActions } from '../../redux/actions/SkinsActions';
import '../Fonts.css';
import { skins } from '../Settings/Skins';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Settings extends Component{
    constructor(props){
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    componentDidMount(){
        document.body.style.backgroundColor = "white";
        this.props.getCurrent()
    }

    handleSignOut(e){
        e.preventDefault();
        this.props.logout()
    }

    render(){
        const { user } = this.props
        const mySkin = skins[this.props.activeSkin]
        const styles = {
            profilePic: {
                margin: 30,
                marginLeft: '30%',
                color: mySkin.avatar.style.color
            }
        }
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
                            <FontAwesomeIcon  style={styles.profilePic} icon={mySkin.avatar.name} size='6x' />
                            <Card.Text style={{marginLeft: '25%'}}>
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
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Userame: {user.username}</Card.Link>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Email: {user.email}</Card.Link>
                                <Card.Link className="CardLinks" style={{margin:"0.25em auto"}}>Guild: {user.guild}</Card.Link>
                        </Card>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Privacy Settings</Card.Title>
                            <Link to='/Settings/Email' className="CardLinks" style={{margin:"0.25em auto"}}>Change Email</Link>
                            <Link to='/Settings/Password' className="CardLinks" style={{margin:"0.25em auto"}}>Change Password</Link>
                            <Link to='/Settings/Guild' className="CardLinks" style={{margin:"0.25em auto"}}>Change Guild</Link>
                        </Card>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <Card className="SettingCards">
                            <Card.Title  className="CardTitle">Appearance</Card.Title>
                            <Link to='/Settings/Skin' className="CardLinks" style={{margin:"0.25em auto"}}>Change Skin</Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps (state) {
   const user = state.user.currentUser
   const { activeSkin } = state.skins
   return { user, activeSkin }
}

const actionCreators = {
    logout: userActions.logout,
    getCurrent: userActions.getCurrent,
    getOwnedSkins: skinsActions.getOwnedSkins,
}

export default connect(mapStateToProps, actionCreators)(Settings);