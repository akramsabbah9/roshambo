import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import Chat from '../Chat';
import Loading from '../Loading/Loading';
import { userActions } from '../../redux/actions/UsersActions';
import { socketActions } from '../../redux/actions/SocketActions';
import { Redirect } from 'react-router-dom'
import { skinsActions } from '../../redux/actions/SkinsActions'

import '../Fonts.css';


class GameLobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bettingAmount: 0,
            myselfReady: false,
            otherReady: false,
            matched: false,
            socketResponseHandlerAdded: false,
            opponent: null,
            gameStarted: false,
            betingDisabled: false,
            opponentSkin: null,
            belaySocketClosing: false,
            userMustVacate: false,
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
        this.props.getActiveSkin()
    }

    componentWillUnmount() {
        // listeners MUST be removed once the react component is gone, 
        // as the socket itself will persists thanks to the redux store
        this.props.socket.removeAllListeners();
        if (!this.state.belaySocketClosing) {
            this.props.destructSocket();
        }
    }

    componentDidUpdate() {
        if (this.props.socket && !this.state.socketResponseHandlerAdded) {
            this.props.socket.onMessage.addListener(data => this.handleSocketMessage(data))
            this.setState({socketResponseHandlerAdded: true})
        }
        if (this.state.userMustVacate) {
            setTimeout(() => {
                this.props.history.push('/userdashboard');
            }, 4000);
        }
    }

    handleSocketMessage(data) {
        let json = JSON.parse(data)
        const command = json.command;
        switch (command) {
            case 'channel':
                if (json.hasOwnProperty('start')) {
                    this.setState({gameStarted: true, belaySocketClosing: true});
                }
                else if (json.hasOwnProperty('user_readied')) {
                    if (json.user_readied != this.props.user.username) {
                        this.setState({otherReady: !this.state.otherReady});
                    }
                }
                else if (json.hasOwnProperty('user_joined')) {
                    if (json.user_joined.username != this.props.user.username) {
                        this.setState({opponent: json.user_joined, matched: true, opponentSkin: json.active_skin});
                    }
                    if (json.hasOwnProperty('total_bet')) {
                        this.setState({bettingAmount: json.total_bet});
                    }
                }
                else if (json.hasOwnProperty('user_left')) {
                    if (json.user_left.username != this.props.user.username) {
                        this.setState({opponent: null, matched: false, opponentSkin: null});
                    }
                    if (json.hasOwnProperty('lock')) {
                        if (json.lock)
                        {
                            this.setState({userMustVacate: true});
                        }
                    }
                }  
                break
            case 'bet':
                if (json.status > 399 && (!this.state.opponent || json.user_betting != this.state.opponent.id)) {
                    this.setState({bettingDisabled: true})
                }
                else {
                    this.setState({bettingAmount: this.state.bettingAmount + 5})
                }
                break
        }
    }

    handleExit(e) {
        e.preventDefault()
        this.props.history.push('/userdashboard')
    }

    handleBet(e) {
        if (this.state.bettingDisabled) {
            return;
        }
        e.preventDefault()
        this.props.socket.sendRequest({
            'command': 'bet',
            'amount': 5
        });
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

    const headerInfo = 
    <React.Fragment>
    <Navbar bg="light" className="Buttons"> 
        <Link to='/userdashboard'>       
            <Navbar.Brand style={{fontSize: '30px'}}>Roshambo</Navbar.Brand>
        </Link>  
        <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
        </Navbar.Collapse>
    </Navbar>
    <Row>
        <Col xs={4}>
            <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
            </div>
            {this.state.myselfReady ? <div className="col d-flex align-items-center justify-content-center"><h6>READY</h6></div> : null}   
            <div className="col d-flex align-items-center justify-content-center">
                <h5 style={{margin: 15}}>{myself.username}</h5>
            </div>
        </Col>
        <Col xs={4}>
            <div className="col d-flex align-items-center justify-content-center">
                <p style={styles.versus}>VS</p>
                </div>
                <Card style={styles.betBox}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Card.Body>Pot of AkramBucks: {this.state.bettingAmount}</Card.Body>
                    </div>
                    {this.state.bettingDisabled ? 
                    <div className="d-flex align-items-center justify-content-center">
                        <Card.Body>You have fewer than 5 AkramBucks in your account, and can make no more bets on this game.</Card.Body>
                    </div> : null}
                </Card>
        </Col>
        <Col xs={4}>
            {this.state.matched ? 
            <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                <FontAwesomeIcon  style={skins[this.state.opponentSkin].avatar.style} icon={skins[this.state.opponentSkin].avatar.name} size='6x' />
            </div>
            :
            <div className="col d-flex align-items-center justify-content-center" style={{marginTop: '4em'}}>Searching for an opponent...</div>}
            {this.state.otherReady && this.state.matched ? <div className="col d-flex align-items-center justify-content-center" style={{marginTop: '0.5em'}}><h6>READY</h6></div> : null}   
            <div className="col d-flex align-items-center justify-content-center">
                <h5 style={{margin: 15}}>{this.state.matched ? this.state.opponent.username : <Loading />}</h5>
            </div>
        </Col>
    </Row>
    </React.Fragment>;

        if (this.state.gameStarted) {
            return <Redirect to={{
                pathname: '/GamePage',
                state: { opponent: this.state.opponent, bettingAmount: this.state.bettingAmount, opponentSkin: this.state.opponentSkin }
              }} />;
        }
        else if (this.state.userMustVacate) {
            return (
                <Container className="Words">
                    {headerInfo}
                    <Row style={{margin:50}}>
                        <Loading />
                    </Row>
                    <Row style={{margin:50}}>
                        <p>Unfortunately, your opponent quit after placing a bet, nullifying your game lobby.</p>
                        <p>All placed bets will be returned to their respective bettors, and no money will change hands.</p>
                        <p>You're being redirect to the user dashboard - please join a new match from there.</p>
                    </Row>
                <Chat />
                </Container>
            );
        }
        else {
        return(
            <Container className="Words">
                {headerInfo}
                <Row style={{margin:50}}>
                    <Col style={{maxWidth: '100%', flex: '0 0 100%', marginLeft: '1em'}}>
                        <Row>
                                <Button style={{margin:5}} variant="outline-success" className="Buttons" block size="lg" onClick={this.handleReady.bind(this)}>Ready</Button>      
                        </Row>
                        <Row>
                                <Button style={{margin:5}} variant="outline-warning" className="Buttons" block size="lg" onClick={this.handleBet.bind(this)} disabled={this.state.betingDisabled}>Bet 5 AkramBucks</Button>                       
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
    getActiveSkin: skinsActions.getActiveSkin,
    logout: userActions.logout,
    getCurrent: userActions.getCurrent,
    constructSocket: socketActions.constructSocket,
    destructSocket: socketActions.destructSocket,
}


export default connect(mapStateToProps, actionCreators)(GameLobby);