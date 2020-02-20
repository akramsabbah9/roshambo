import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { history } from '../../utils/history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import Chat from '../Chat';
import { socketActions } from '../../redux/actions/SocketActions';
import { userActions } from '../../redux/actions/UsersActions';
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
        if (this.props.socket == null) {
            this.props.constructSocket()
        }
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
        e.preventDefault();
        if (this.state.myselfReady) {
            this.props.socket.sendRequest({
                'command': 'rps',
                'ready': false
            }).then(() => this.setState({myselfReady: false}));
        }
        else {
            this.props.socket.sendRequest({
                'command': 'rps',
                'ready': true
            }).then(() => this.setState({myselfReady: true}));
        }
    }

    handleSignOut(e) {
        e.preventDefault();
        this.props.logout()
    }

    render(){
        const mySkin = skins[this.props.activeSkin]
        const myself = this.props.user

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
                            <h5>ME: {myself.username}</h5>
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
                    <Col style={{maxWidth: '100%', flex: '0 0 100%', marginLeft: '1em'}}>
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
            <Chat />
            </Container>
        )
    }
}

function mapStateToProps (state) {
    const { activeSkin } = state.skins
    const user = state.user.currentUser;
    const socket = state.socket.socket;
    return { activeSkin, user, socket }
}

const actionCreators = {
    logout: userActions.logout,
    constructSocket: socketActions.constructSocket,
}


export default connect(mapStateToProps, actionCreators)(GameLobby);