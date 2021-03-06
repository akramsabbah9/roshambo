import React, { Component } from 'react';
import { Container, Row, Col, Card, 
         ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper, faHandRock, faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { socketActions } from '../../redux/actions/SocketActions';
import { history } from '../../utils/history';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import "../Fonts.css";

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

class GamePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 5,
            winnerName: 'No one!',
            playerMove: null,
            GameStarted: false,
            myWins: 0,
            opponentWins: 0,
            socketResponseHandlerAdded: false,
            opponentMove: null,
            winnerReceived: false,
            rounds: 1,
            matchOver: false,
            belaySocketClosing: false,
            userMustVacate: false,
            roundTimer: null,
            timerCounter: null,
        }
        this.onClick = this.onClick.bind(this);
        this.CountDown = this.CountDown.bind(this);
        this.CountDownEffect = this.CountDownEffect.bind(this);
        this.Quit = this.Quit.bind(this);
        this.handleSocketMessage = this.handleSocketMessage.bind(this);
    }

    componentDidMount() {
        if (this.props.socket && !this.state.socketResponseHandlerAdded) {
            this.props.socket.onMessage.addListener(data => this.handleSocketMessage(data))
            this.setState({socketResponseHandlerAdded: true})
        }
        if (this.state.rounds == 1) {
            this.setState({GameStarted: true})
            this.CountDown();
        }
    }

    componentWillUnmount() {
        // listeners MUST be removed once the react component is gone, 
        // as the socket itself will persists thanks to the redux store
        this.props.socket.removeAllListeners();
        if (!this.state.belaySocketClosing) {
            this.props.destructSocket();
        }
        clearInterval(this.state.timerCounter);
        clearTimeout(this.state.roundTimer);
    }

    componentDidUpdate() {
        if (!this.state.GameStarted && this.state.winnerReceived && !this.state.matchOver) {
            setTimeout(() => {
                this.props.socket.sendRequest({'command': 'begin_round'});
            }, 1000);
        }

        if (this.state.matchOver || this.state.userMustVacate) {
            setTimeout(() => {
                history.push('/userdashboard');
            }, 4500);
        }
    }

    handleSocketMessage(data) {
        let json = JSON.parse(data)
        const command = json.command;
        switch (command) {
            case 'channel':
                if (json.hasOwnProperty('winner')) {
                    const opponentMove = this.props.location.state.opponent.id == json.user1 ? json.user1_move : json.user2_move;
                    const playerMove = this.props.location.state.opponent.id == json.user1 ? json.user2_move : json.user1_move;
                    if (json.winner == 'None') {
                        this.setState({
                            winnerName: 'No one!', 
                            opponentMove: opponentMove,
                            playerMove: playerMove,
                            winnerReceived: true,
                            rounds: this.state.rounds+1,
                        });
                    }
                    else if (json.winner != this.props.location.state.opponent.id) {
                        this.setState({
                            winnerName: this.props.user.username, 
                            myWins: this.state.myWins+1, 
                            opponentMove: opponentMove,
                            playerMove: playerMove,
                            winnerReceived: true,
                            rounds: this.state.rounds+1
                        });
                    }
                    else {
                        this.setState({
                            winnerName: this.props.location.state.opponent.username, 
                            opponentWins: this.state.opponentWins+1,
                            opponentMove: opponentMove,
                            playerMove: playerMove,
                            winnerReceived: true,
                            rounds: this.state.rounds+1,
                        });
                    }

                    if (json.match_over) {
                       setTimeout(() => {this.setState({matchOver: true});}, 2000);
                    }
                }
                else if (json.hasOwnProperty('start')) {
                    this.setState({
                        winnerName: null,
                        opponentMove: null,
                        playerMove: null,
                        GameStarted: true,
                        winnerReceived: false,
                    });
                    this.CountDown();
                }
                else if (json.hasOwnProperty('user_left')) {
                    this.setState({userMustVacate: true})
                }  
                break
        }
    }

    Quit() {
        history.push('/userdashboard');
    }

    onClick(selection) {
        switch(selection){
            case ROCK:
                this.props.socket.sendRequest({
                    'command': 'rps',
                    'move': 'rock',
                }).then(this.setState({playerMove: ROCK}));
                break;
            case PAPER:
                this.props.socket.sendRequest({
                    'command': 'rps',
                    'move': 'paper',
                }).then(this.setState({playerMove: PAPER}));
                break;
            case SCISSORS:
                this.props.socket.sendRequest({
                    'command': 'rps',
                    'move': 'scissors',
                }).then(this.setState({playerMove: SCISSORS}));
                break;
        }
    }

    CountDown() {
        let secs = 5;
        const timerCounter = setInterval(() => {
            this.CountDownEffect();
            this.setState({counter: --secs});
        }, 1000);
        const roundTimer = setTimeout(() => {
            clearInterval(timerCounter);
            this.setState({counter: 5});
            this.setState({GameStarted: false});
            this.props.socket.sendRequest({
                'command': 'end_round'
            });
        }, 5000);
        this.setState({roundTimer: roundTimer, timerCounter: timerCounter})
    }

    CountDownEffect() {
        let ele = document.getElementById("CountDown");
        if (ele) {
            ele.animate([ { opacity: '0%'},
                { opacity: '25%', offset: 0.5 },
                { opacity: '50%'},
                { opacity: '100%'} ], 1000);
        }
    }

render() {
    const mySkin = skins[this.props.activeSkin]
    const myself = this.props.user
    const { myWins, opponentWins } = this.state
    const { opponent, opponentSkin } = this.props.location.state;

    const styles = {
        profilePic: {
            margin: 15,
        },
        title: {
            marginLeft: 25,
            marginTop: 15,
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
        },
        timer: {
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 50,
            margin: 5,
        },
        counter: {
            fontSize: 30,
            fontWeight: 'bold',
            margin: 5,
            marginBottom: 25,
        }
    }

    const userInfo = 
    <React.Fragment>
    <Row>
        <Col sm={4}>
            <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
            </div>
            <div className="col d-flex align-items-center justify-content-center">
                <h3>{myself.username}</h3>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
                <p>WINS: {myWins}</p>
            </div>
        </Col>
        <Col sm={4}>
            <div className="col d-flex align-items-center justify-content-center">
                <p style={styles.versus}>Game: {this.state.gameCount}</p>
            </div>
            
            <div className="col d-flex align-items-center justify-content-center">
                <p style={styles.versus}>VS</p>
            </div>
                <Card style={styles.betBox}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Card.Body>Pot of AkramBucks: {this.props.location.state.bettingAmount}</Card.Body>
                    </div>
                </Card>
            
        </Col>
        <Col sm={4}>
                <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon  style={skins[opponentSkin].avatar.style} icon={skins[opponentSkin].avatar.name} size='6x' />
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                    <h5 style={{margin: 15}}>{opponent.username}</h5>
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                <p>WINS: {opponentWins}</p>
                </div>
        </Col>
    </Row>
    </React.Fragment>;

    if (this.state.userMustVacate) {
        return (
            <Container className="Words" style={{marginTop: '5%'}}>
                {userInfo}
                <Row style={{margin:50}}>
                    <div className="col col-sm-6 offset-sm-3 d-flex align-items-center justify-content-center" style={{fontSize: '20px'}}>
                        <p>Unfortunately, your opponent quit (rage, much?).
                        All placed bets will be returned to their respective bettors, and no money will change hands.
                        You're being redirect to the user dashboard - please join a new match from there.</p>
                    </div>
                </Row> 
            </Container>
        );
    }
    else {
        return (
            <Container className="Words" style={{marginTop: '5%'}}>
                {userInfo}
                {!this.state.matchOver ?
                <React.Fragment>
                <Row style={{marginTop:50, marginBottom:50}}>
                    <Col sm={3}>
                        {
                            this.state.playerMove == ROCK ?
                            <FontAwesomeIcon icon={faHandRock} size="5x" style={{marginLeft: "70%"}}/> : (
                                this.state.playerMove == PAPER ?
                                <FontAwesomeIcon icon={faHandPaper} size="5x" style={{marginLeft: "70%"}}/> :(
                                    this.state.playerMove == SCISSORS ?
                                    <FontAwesomeIcon icon={faHandPeace} size="5x" style={{marginLeft: "70%"}}/> :
                                    <div></div>
                                )
                            )
                        }
                    </Col>
                    <Col sm={6}>
                        <div className="col d-flex align-items-center justify-content-center">
                            <p style={styles.timer}>Make Your Pick!</p>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center" id="CountDown">
                            <p style={styles.counter}>{this.state.counter}</p>
                        </div>
                    </Col>
                    <Col sm={3}>
                        {
                            this.state.opponentMove == ROCK ?
                            <FontAwesomeIcon icon={faHandRock} size="5x"/> : (
                                this.state.opponentMove == PAPER ?
                                <FontAwesomeIcon icon={faHandPaper} size="5x"/> :(
                                    this.state.opponentMove == SCISSORS ?
                                    <FontAwesomeIcon icon={faHandPeace} size="5x"/> :
                                    <div></div>
                                )
                            )
                        }
                    </Col>
                </Row>
                <Row style={{margin:25}}>
                    <ButtonToolbar className="col d-flex align-items-center justify-content-center">
                        <ButtonGroup size="lg" style={{width: '100%'}}>
                            <Button 
                                value={"rock"} 
                                onClick={() => this.onClick(ROCK)} 
                                style={{marginRight: "1%"}}
                                disabled={!this.state.GameStarted}
                            >
                                <FontAwesomeIcon icon={faHandRock}/>
                            </Button>
                            <Button 
                                value={"paper"} 
                                onClick={() => this.onClick(PAPER)} 
                                style={{marginRight: "1%"}}
                                disabled={!this.state.GameStarted}
                            >
                                <FontAwesomeIcon icon={faHandPaper}/>
                            </Button>
                            <Button 
                                value={"scissors"} 
                                onClick={() => this.onClick(SCISSORS)} 
                                style={{marginRight: "1%"}}
                                disabled={!this.state.GameStarted}
                            >
                                <FontAwesomeIcon icon={faHandPeace}/>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Row>
                <Row style={{margin:25}}>
                    <div className="col d-flex align-items-center justify-content-center"
                    style={{fontFamily: "Bangers, cursive", fontSize: "2em"}}>
                        {this.state.winnerReceived ? `Winner: ${this.state.winnerName}` : ""}
                    </div>
                </Row>
                <Row>
                    <div className="col d-flex justify-content-center align-items-center">
                        <Button variant='danger' className="Buttons" size="lg" onClick={this.Quit} disabled={this.state.matchOver}>
                            Get Me Out
                        </Button>
                    </div>
                </Row>
                </React.Fragment>
            :
                <React.Fragment  style={{fontSize: '20px'}}>
                    <div className="col d-flex justify-content-center align-items-center">
                        <p>Match over!</p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <p>{this.state.myWins > this.state.opponentWins ? 'You won!' : 'You lost!'}</p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <p>All the AkramBucks go to {this.state.myWins > this.state.opponentWins ? 'you' : this.props.location.state.opponent.username}!!</p>
                    </div>
                </React.Fragment>
            }
            </Container>
        );
    }
}
};


function mapStateToProps (state) {
    const { activeSkin } = state.skins
    const user = state.user.currentUser
    const socket = state.socket.socket;
    return { activeSkin, user, socket }
}

const actionCreators = {
    destructSocket: socketActions.destructSocket,
}

export default connect(mapStateToProps, actionCreators)(GamePage);
