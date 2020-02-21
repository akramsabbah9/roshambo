import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import Chat from '../Chat';
import Loading from '../Loading/Loading';
import { userActions } from '../../redux/actions/UsersActions';
import { socketActions } from '../../redux/actions/SocketActions';
import { Redirect } from 'react-router-dom'


import '../Fonts.css';


class GameLobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bettingAmount: '$0',
            myselfReady: false,
            otherReady: false,
            matched: false,
            socketResponseHandlerAdded: false,
            opponent: null,
            gameStarted: false,
        }
        this.handleExit = this.handleExit.bind(this);
        this.handleReady = this.handleReady.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        if (this.props.socket == null) {
            this.props.constructSocket()
        }
    }
    
    componentDidMount(){
        this.props.getCurrent()
    }

    componentWillUnmount() {
        this.props.socket.removeAllListeners();
    }

    componentDidUpdate() {
        if (this.props.socket && !this.state.socketResponseHandlerAdded) {
            this.props.socket.onMessage.addListener(data => this.handleSocketMessage(data))
            this.setState({socketResponseHandlerAdded: true})
        }
    }

    handleSocketMessage(data) {
        let json = JSON.parse(data)
        const command = json.command;
        switch (command) {
            case 'channel':
                if (json.hasOwnProperty('start')) {
                    this.setState({gameStarted: true});
                }
                else if (json.hasOwnProperty('user_readied')) {
                    if (json.user_readied != this.props.user.username) {
                        this.setState({otherReady: !this.state.otherReady});
                    }
                }
                else if (json.hasOwnProperty('winner')) {
                    console.log("got winner")

                }
                else if (json.hasOwnProperty('user_joined')) {
                    if (json.user_joined.username != this.props.user.username) {
                        this.setState({opponent: json.user_joined, matched: true});
                    }
                }
                break
            case 'chat':
                console.log("got chat msg")
                break
            case 'rps':
                console.log("got rps msg")
                break
            case 'bet':
                console.log("got bet msg")
                break
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
            }).then(this.setState({myselfReady: false}));
        }
        else {
            this.props.socket.sendRequest({
                'command': 'rps',
                'ready': true
            }).then(this.setState({myselfReady: true}));
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
        if (this.state.gameStarted) {
            return <Redirect to={{
                pathname: '/GamePage',
                //props.location.state.opponent
                state: { opponent: this.state.opponent, bettingAmount: this.state.bettingAmount }
              }} />;
        }
        else {
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
                    {/*---- OUR user info ----*/}
                    <Col xs={4}>
                        <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
                        </div>
                        {this.state.myselfReady ? <div className="col d-flex align-items-center justify-content-center"><h6>READY</h6></div> : null}   
                        <div className="col d-flex align-items-center justify-content-center">
                            <h5 style={{margin: 15}}>{myself.username}</h5>
                        </div>
                    </Col>
                    {/*---- central detail pane ----*/}
                    <Col xs={4}>
                        <div className="col d-flex align-items-center justify-content-center">
                            <p style={styles.versus}>VS</p>
                            </div>
                            <Card style={styles.betBox}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Card.Body>Pot of AkramBucks: {this.state.bettingAmount}</Card.Body>
                                </div>
                            </Card>
                    </Col>
                    {/*---- OPPONENT user info ----*/}
                    <Col xs={4}>
                        {this.state.matched ? 
                        <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon  style={mySkin.avatar.style} icon={faDragon} size='6x' />
                        </div>
                        :
                        <div className="col d-flex align-items-center justify-content-center" style={{marginTop: '4em'}}>Searching for an opponent...</div>}
                        {this.state.otherReady && this.state.matched ? <div className="col d-flex align-items-center justify-content-center" style={{marginTop: '0.5em'}}><h6>READY</h6></div> : null}   
                        <div className="col d-flex align-items-center justify-content-center">
                            <h5 style={{margin: 15}}>{this.state.matched ? this.state.opponent.username : <Loading />}</h5>
                        </div>
                    </Col>
                </Row>
                <Row style={{margin:50}}>
                    <Col style={{maxWidth: '100%', flex: '0 0 100%', marginLeft: '1em'}}>
                        <Row>
                                <Button style={{margin:5}} variant="outline-success" className="Buttons" block size="lg" onClick={this.handleReady.bind(this)}>Ready</Button>      
                        </Row>
                        <Row>
                                <Button style={{margin:5}} variant="outline-warning" className="Buttons" block size="lg" onClick={this.handleBet.bind(this)}>Bet</Button>                       
                        </Row>
                        <Row>                          
                                <Button style={{margin:5}} variant="outline-danger" className="Buttons" block size="lg" onClick={this.handleExit.bind(this)}>Exit</Button>
                        </Row>
                    </Col>
                </Row>
            <Chat />
            </Container>
        )
    }
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
    getCurrent: userActions.getCurrent,
    constructSocket: socketActions.constructSocket,
}


export default connect(mapStateToProps, actionCreators)(GameLobby);