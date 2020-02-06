import React, { Component } from 'react';
import { Container, ToggleButton, Row, Col, Card, ToggleButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehRollingEyes, faDragon, faHandPaper, faHandScissors, faHandRock } from "@fortawesome/free-solid-svg-icons";


class GamePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            bettingAmount: '$40',
            gameCount: 2,
            counter: 5,
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
            <Row style={{margin:50}}>
                <Col>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p style={styles.timer}>Make Your Pick!</p>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p style={styles.counter}>{this.state.counter}</p>
                    </div>
                </Col>
            </Row>
            <Row style={{margin:50}}>
                <ButtonToolbar className="col d-flex align-items-center justify-content-center">
                        <ToggleButtonGroup size="lg" style={{width:'100%'}} type="radio" name="options" >
                            <ToggleButton value={"rock"}>
                                <FontAwesomeIcon icon={faHandRock}/>
                            </ToggleButton>
                            <ToggleButton value={"paper"}>
                                <FontAwesomeIcon icon={faHandPaper}/>
                            </ToggleButton>
                            <ToggleButton value={"scissors"}>
                                <FontAwesomeIcon icon={faHandScissors}/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
            </Row>

        </Container>
    )
}
}

export default GamePage;