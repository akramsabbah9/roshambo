import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehRollingEyes, faDragon } from "@fortawesome/free-solid-svg-icons";
import { history } from '../../utils/history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import '../Game.css';



class GameLobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bettingAmount: '$0',
            myselfReady: false,
        }
        this.handleExit = this.handleExit.bind(this);
        this.handleReady = this.handleReady.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleExit(e) {
        e.preventDefault()
        this.props.history.push('/userdashboard')
    }

    handleBet(e) {
        e.preventDefault()
        this.props.history.push('/betting')
    }

    handleReady(e) {
        e.preventDefault()
        if (this.state.myselfReady)
            this.setState({myselfReady: false})
        else
            this.setState({myselfReady: true})

        
        setTimeout( () => {
            this.props.history.push('/GamePage')
        }, 1200)
    }

    handleSignOut(e) {
        e.preventDefault();
        history.push('/login');
    }

    render(){
        const mySkin = skins[this.props.activeSkin]
        const myself = this.props.user

        console.log(JSON.stringify(mySkin))

        const styles = {
            profilePic: {
                marginTop: 30,
            },
            title: {
                marginLeft: 25,
                marginTop: 15,
            },
            chatBox: {
                width: '100%',
                height: '100%',
            },
            btn: {
                margin: 10,
            },
            versus: {
                margin: 5,
                fontSize: 30,
            },
            betBox: {
                margin: 10,
            }
        }
        

        return(
            <Container className="Words">
                <Navbar bg="light"> 
                    <Link to='/userdashboard'>       
                        <Navbar.Brand className="Buttons" style={{fontSize: '30px'}}>Roshambo</Navbar.Brand>
                    </Link>  
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger" className="Buttons" onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Row>
                    <Col xs={4}>
                        <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
                             {this.state.myselfReady ? <p>READY</p> : null}   
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <h5>ME: {myself.name}</h5>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="col d-flex align-items-center justify-content-center">
                            <p style={styles.versus}>VS</p>
                            </div>
                            <Card style={styles.betBox}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Card.Body>Betting Amount: {this.state.bettingAmount}</Card.Body>
                                </div>
                            </Card>
                    </Col>
                    <Col xs={4}>
                        <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon  style={mySkin.avatar.style} icon={faDragon} size='6x' />
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <h5>THEM: Jared18</h5>
                        </div>
                    </Col>
                </Row>
                <Row style={{margin:50}}>
                    <Col xs={6}>
                        <Card style={styles.chatBox}>
                            <Card.Body>
                                Chat Box
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Row>
                                <Button variant="outline-success" className="Buttons" block size="lg" onClick={this.handleReady}>Ready</Button>      
                        </Row>
                        <Row>
                                <Button variant="outline-warning" className="Buttons" block size="lg" onClick={this.handleBet}>Bet</Button>                       
                        </Row>
                        <Row>                          
                                <Button variant="outline-danger" className="Buttons" block size="lg" onClick={this.handleExit}>Exit</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>

        )
    }
}


function mapStateToProps (state) {
    const { activeSkin } = state.skins
    const { user } = state.auth

    return { activeSkin, user }
}


export default connect(mapStateToProps)(GameLobby);