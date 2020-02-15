import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Image, Card, ListGroup, Title, ButtonGroup, Overlay } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMehRollingEyes, faDragon, faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';




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

    handleSignOut(e){
        e.preventDefault();
        this.props.history.push("/login");
    }

    render(){
        const styles = {
            profilePic: {
                margin: 30,
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
            
            <Container>
                <Navbar bg="light">
                    <Navbar.Brand>
                        <Link to="/userdashboard" style={{color: "black", fontFamily: "Bangers, cursive", fontSize: "1.5em"}}>
                            Roshambo
                        </Link>
                    </Navbar.Brand>
                    <Button style={{marginLeft: '76%', justifySelf: 'center'}} variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                </Navbar>
                <Row>
                    <Col>
                        <div className="col d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon  style={styles.profilePic} icon={faMehRollingEyes} size='6x' />
                             {this.state.myselfReady ? <p>READY</p> : null}   
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <p>ME</p>
                        </div>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <Row style={{margin:50}}>
                    <Col>
                        <Card style={styles.chatBox}>
                            <Card.Body>
                                Chat Box
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                                <Button variant="outline-success" style={styles.btn} block size="lg" onClick={this.handleReady}>Ready</Button>      
                        </Row>
                        <Row>
                                <Button variant="outline-success"style={styles.btn} block size="lg" onClick={this.handleBet}>Bet</Button>                       
                        </Row>
                        <Row>                          
                                <Button variant="outline-danger" style={styles.btn} block size="lg" onClick={this.handleExit}>Exit</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>

        )
    }
}


export default GameLobby;