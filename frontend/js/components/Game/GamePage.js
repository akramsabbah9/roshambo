import React, { Component } from 'react';
import { Container, Row, Col, Card, 
         ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehRollingEyes, faDragon, faHandPaper, faHandScissors, faHandRock, faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { history } from '../../utils/history';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import "../Fonts.css";

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

class GamePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            bettingAmount: '$40',
            counter: 3,
            winnerName: 'No-one',
            playerMove: -1,
            CPUMove: -1,
            GameEnded: false,
            GameStarted: false,
            CPUwins: 0,
            myWins: 0,
        }
        this.onClick = this.onClick.bind(this);
        this.CPUMove = this.CPUMove.bind(this);
        this.CountDown = this.CountDown.bind(this);
        this.GameEndLogic = this.GameEndLogic.bind(this);
        this.CountDownEffect = this.CountDownEffect.bind(this);
        this.Quit = this.Quit.bind(this);
    }
    Quit(){
        history.push('/userdashboard');
    }
    onClick(selection){
        this.state.GameStarted = true;
        switch(selection){
            case ROCK:
                console.log("ROCK");
                this.setState({playerMove: ROCK});
                break;
            case PAPER:
                console.log("PAPER");
                this.setState({playerMove: PAPER});
                break;
            case SCISSORS:
                console.log("SCISSORS");
                this.setState({playerMove: SCISSORS});
                break;
        }
        this.CountDown();
    }
    CPUMove(){
        var rand = Math.floor(Math.random() * 3);
        switch(rand){
            case ROCK:
                console.log("CPU Move: ROCK");
                this.setState({CPUMove: ROCK});
                break;
            case PAPER:
                console.log("CPU Move: PAPER");
                this.setState({CPUMove: PAPER});
                break;
            case SCISSORS:
                console.log("CPU Move: SCISSORS");
                this.setState({CPUMove: SCISSORS});
                break;
        }
    }
    CountDown(){
        var secs = 3;
        var timerID = setInterval(() => {
            this.CountDownEffect();
            this.setState({CPUMove: -1});
            this.setState({counter: --secs});
            console.log(secs);
        }, 1000);
        setTimeout(() => {
            clearInterval(timerID);
            this.setState({counter: 3});
            this.CPUMove();
            this.setState({GameEnded: true, GameStarted: false});
            this.GameEndLogic();
        }, 3000);
    }
    CountDownEffect(){
        var ele = document.getElementById("CountDown");
        ele.animate([ { opacity: '0%'},
               { opacity: '25%', offset: 0.5 },
               { opacity: '50%'},
               { opacity: '100%'} ], 1000);
    }
    GameEndLogic(){
        switch(this.state.playerMove){
            case PAPER:
                if(this.state.CPUMove == SCISSORS){
                    let wins = this.state.CPUwins + 1
                    this.setState({winnerName: "You have been defeated", CPUwins: wins});
                } 
                if(this.state.CPUMove == ROCK) {
                    let wins = this.state.myWins + 1
                    this.setState({winnerName: "You are Victorious", myWins: wins});
                } 
                if(this.state.CPUMove == PAPER) this.setState({winnerName: "No one wins"});
                break;
            case SCISSORS:
                if(this.state.CPUMove == SCISSORS) this.setState({winnerName: "No one wins"});
                if(this.state.CPUMove == ROCK) {
                    let wins = this.state.CPUwins + 1
                    this.setState({winnerName: "You have been defeated", CPUwins: wins});
                } 
                if(this.state.CPUMove == PAPER) {
                    let wins = this.state.myWins + 1
                    this.setState({winnerName: "You are Victorious", myWins: wins});
                }
                break;
            case ROCK:
                if(this.state.CPUMove == SCISSORS) {
                    let wins = this.state.myWins + 1
                    this.setState({winnerName: "You are Victorious", myWins: wins});
                } 
                if(this.state.CPUMove == ROCK) this.setState({winnerName: "No one wins"});
                if(this.state.CPUMove == PAPER) {
                    let wins = this.state.CPUwins + 1
                    this.setState({winnerName: "You have been defeated", CPUwins: wins});
                } 
                break;
        }
    }

render() {
    const mySkin = skins[this.props.activeSkin]
    const myself = this.props.user
    const { myWins, CPUwins } = this.state

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
    return (
        <>
        <Container className="Words" style={{marginTop: '5%'}}>
            <Row>
                <Col sm={4}>
                    <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <h3>ME: {myself.username}</h3>
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
                                <Card.Body>Betting Amount: {this.state.bettingAmount}</Card.Body>
                            </div>
                        </Card>
                    
                </Col>
                <Col sm={4}>
                    <div style={styles.profilePic} className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faDragon} size='6x' />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <h3>THEM: JARED</h3>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p>WINS: {CPUwins}</p>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop:50, marginBottom:50}}>
                <Col sm={3}>
                    {
                        this.state.playerMove == 0 ?
                        <FontAwesomeIcon icon={faHandRock} size="5x" style={{marginLeft: "70%"}}/> : (
                            this.state.playerMove == 1 ?
                            <FontAwesomeIcon icon={faHandPaper} size="5x" style={{marginLeft: "70%"}}/> :(
                                this.state.playerMove == 2 ?
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
                        this.state.CPUMove == 0 ?
                        <FontAwesomeIcon icon={faHandRock} size="5x"/> : (
                            this.state.CPUMove == 1 ?
                            <FontAwesomeIcon icon={faHandPaper} size="5x"/> :(
                                this.state.CPUMove == 2 ?
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
                            disabled={this.state.GameStarted}
                        >
                            <FontAwesomeIcon icon={faHandRock}/>
                        </Button>
                        <Button 
                            value={"paper"} 
                            onClick={() => this.onClick(PAPER)} 
                            style={{marginRight: "1%"}}
                            disabled={this.state.GameStarted}
                        >
                            <FontAwesomeIcon icon={faHandPaper}/>
                        </Button>
                        <Button 
                            value={"scissors"} 
                            onClick={() => this.onClick(SCISSORS)} 
                            style={{marginRight: "1%"}}
                            disabled={this.state.GameStarted}
                        >
                            <FontAwesomeIcon icon={faHandPeace}/>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
            <Row style={{margin:25}}>
                <div className="col d-flex align-items-center justify-content-center"
                style={{fontFamily: "Bangers, cursive", fontSize: "2em"}}>
                    {this.state.GameEnded ? this.state.winnerName : ""}
                </div>
            </Row>
            <Row>
                <div className="col d-flex justify-content-center align-items-center">
                    <Button variant='danger' className="Buttons" size="lg" onClick={this.Quit}>
                        Get Me Out
                    </Button>
                </div>
            </Row>
        </Container>
        </>
    )
}
}


function mapStateToProps (state) {
    const { activeSkin } = state.skins
    const user = state.user.currentUser

    return { activeSkin, user }
}


export default connect(mapStateToProps)(GamePage);