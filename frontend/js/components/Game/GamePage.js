import React, { Component } from 'react';
import { Container, ToggleButton, Row, Col, Card, ToggleButtonGroup, 
         ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehRollingEyes, faDragon, faHandPaper, faHandScissors, faHandRock, faHandPeace } from "@fortawesome/free-solid-svg-icons";

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
            GameStarted: false
        }
        this.onClick = this.onClick.bind(this);
        this.CPUMove = this.CPUMove.bind(this);
        this.CountDown = this.CountDown.bind(this);
        this.GameEndLogic = this.GameEndLogic.bind(this);
        this.CountDownEffect = this.CountDownEffect.bind(this);
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
                if(this.state.CPUMove == SCISSORS) this.setState({winnerName: "You have been defeated"});
                if(this.state.CPUMove == ROCK) this.setState({winnerName: "You are Victorious"});
                if(this.state.CPUMove == PAPER) this.setState({winnerName: "No one wins"});
                break;
            case SCISSORS:
                if(this.state.CPUMove == SCISSORS) this.setState({winnerName: "No one wins"});
                if(this.state.CPUMove == ROCK) this.setState({winnerName: "You have been defeated"});
                if(this.state.CPUMove == PAPER) this.setState({winnerName: "You are Victorious"});
                break;
            case ROCK:
                if(this.state.CPUMove == SCISSORS) this.setState({winnerName: "You are Victorious"});
                if(this.state.CPUMove == ROCK) this.setState({winnerName: "No one wins"});
                if(this.state.CPUMove == PAPER) this.setState({winnerName: "You have been defeated"});
                break;
        }
    }

render() {
    const styles = {
        profilePic: {
            margin: 30,
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
        <Container>
            <Row style={{margin:50, marginTop:'15%'}}>
                <Col>
                    <div className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon  style={styles.profilePic} icon={faMehRollingEyes} size='6x' />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p>ME</p>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p>WINS: 2</p>
                </div>
                </Col>
                <Col>
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
                <Col>
                    <div className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon  style={styles.profilePic} icon={faDragon} size='6x' />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p>JARED</p>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p>WINS: 0</p>
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
            <Row style={{margin:50}}>
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
                   
                        {/* <ToggleButtonGroup size="lg" style={{width:'100%'}} type="radio" name="options" >
                            <ToggleButton value={"rock"} onClick={(event) => this.onClick(0)}>
                                <FontAwesomeIcon icon={faHandRock}/>
                            </ToggleButton>
                            <ToggleButton value={"paper"} onClick={(event) => this.onClick(1)}>
                                <FontAwesomeIcon icon={faHandPaper}/>
                            </ToggleButton>
                            <ToggleButton value={"scissors"} onClick={(event) => this.onClick(2)}>
                                <FontAwesomeIcon icon={faHandScissors}/>
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                </ButtonToolbar>
            </Row>
            <Row>
                <div className="col d-flex align-items-center justify-content-center"
                style={{fontFamily: "Bangers, cursive", fontSize: "2em"}}>
                    {this.state.GameEnded ? this.state.winnerName : ""}
                </div>
            </Row>

        </Container>
    )
}
}

export default GamePage;