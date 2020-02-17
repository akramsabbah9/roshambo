import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import '../Game.css'
import { userActions } from '../../redux/actions/UsersActions';
import { connect } from 'react-redux';



class Betting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            other: {
                bet: 40,
            },
            you: {
                bet: 0,
            },
            ready: false

        }
        //this.handleContinue = this.handleContinue.bind(this)

        this.handleSignOut = this.handleSignOut.bind(this)
    }

    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }

    handleMatchBet() {
        const matched = this.state.other.bet
        this.setState({you: {bet: matched}, ready: true})
    }

    handleAddFive() {
        const newAmt = this.state.you.bet + 5
        this.setState({you: {bet: newAmt}})

        if ((this.state.you.bet+5) >= this.state.other.bet) {
            this.setState({ready: true})
        }
    }
 
    handleReset() {
        this.setState({you: {bet: 0}, ready: false})
    }

    handleContinue() {
        const price = this.state.you.bet
        this.props.history.push('/payment', {type:"Bet", description:"In game bet", id: 0, price:price})
    }

    handleHome() {
        this.props.history.push('/userdashboard')
    }

    handleCancel() {
        this.props.history.push('/gamelobby')
    }

    handleSignOut(e) {
        e.preventDefault();
        this.props.logout()
    }

    render(){
        const styles={
            title: {
                margin: 5,
            },
            cardTitle: {
                margin: 5,
                textWeight: 'bold',
                textAlign: 'center'
            },
            cardBody: {
                textAlign: 'center',
            },
            button: {
                margin: 10,
            }
        }
        return(
            <Container className="Words">
                <Navbar bg="light"> 
                    <Link to='/userdashboard'>       
                        <Navbar.Brand className="Buttons" style={{fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Button className="Buttons" variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <div style={{margin:50}} />
                <Row>
                    <h1 style={styles.title}>Place Bets</h1>
                </Row>
                <div style={{margin:50}} />
                <Row>
                    <Col>
                    <Card>
                    <Card.Title style={styles.cardTitle}>Your Bet</Card.Title>
                    <Card.Body style={styles.cardBody}><h2>${this.state.you.bet}.00</h2></Card.Body>
                    </Card>
                    </Col>

                    <Col>
                    <Card>
                        <Card.Title style={styles.cardTitle}>Opponet's Bet</Card.Title>
                        <Card.Body style={styles.cardBody}><h2>${this.state.other.bet}.00</h2></Card.Body>
                    </Card>
                </Col>
                </Row>
                <div style={{margin:50}} />
                <Row className="col d-flex align-items-center justify-content-center Buttons">
                    <Button style={styles.button} variant="success" onClick={this.handleMatchBet.bind(this)}>Match</Button>
                    <Button style={styles.button} variant="success" onClick={this.handleAddFive.bind(this)}>Add $5</Button>
                    <Button style={styles.button} variant="success" onClick={this.handleReset.bind(this)}>Reset</Button>
                </Row>
                <Row className="col d-flex align-items-center justify-content-center Buttons">
                    <Button style={styles.button} variant="warning" disabled={!this.state.ready} onClick={this.handleContinue.bind(this)}>Continue</Button>
                    <Button style={styles.button} variant="outline-danger" onClick={this.handleCancel.bind(this)}>Cancel</Button>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {}
}

const actionCreators = {
    logout: userActions.logout,
}


export default connect(mapStateToProps, actionCreators)(Betting);