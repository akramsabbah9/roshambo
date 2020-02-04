import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Image, Card, ListGroup, Title, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { faMehRollingEyes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';





/* DATA FOR TESTING ONLY DELETE AFTER! */
const userData = [{
    name: "jerry1",
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry2",
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry3",
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry4",
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry5",
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
}];

const myself = {
    name: "flowerHead10",
    rank: "15",
    guild: "pirates@licious",
    wins: 2,
    loss: 12,
    total: 14
}

class UserDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myself: myself,
            userData: userData
        }
    }

    componentDidMount() {
    }

    handleSignOut() {
        this.props.history.push('/login');
    }

    buildOnlineUserTable () {
        return (
            <Table striped hover responsive size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    <th>Guild</th>
                    <th>Wins</th>
                    <th>Loss</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {this.state.userData.map((user, index) =>         
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.rank}</td>
                    <td>{user.guild}</td>
                    <td>{user.wins}</td>
                    <td>{user.loss}</td>
                    <td>{user.total}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        )
    }

    render() {
        const styles = {
            profilePic: {
                margin: 40,
                marginLeft: 70,
            },
            tableCard: {
                marginTop: 20,
                width: '100%',
                height: '100%'
            },
            title: {
                marginLeft: 25,
                marginTop: 15,
            },
            signOutBtn: {
                marginLeft: '76%',
                justifySelf: 'center'
            }
        }
        return (
            <Container>
                <Navbar bg="light">       
                    <Navbar.Brand style={{marginLeft:8}}href="#home">Roshambo</Navbar.Brand>
                    <Button style={styles.signOutBtn} variant="outline-danger" onClick={this.handleSignOut()}>Sign Out</Button>
                </Navbar>
                <Row>
                    <Col sm={3}>
                        <div className="d-flex flex-column">
                            <FontAwesomeIcon  style={styles.profilePic} icon={faMehRollingEyes} size='6x' />
                        </div>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Name: {this.state.myself.name}</ListGroup.Item>
                                <ListGroup.Item>Rank: {this.state.myself.rank}</ListGroup.Item>
                                <ListGroup.Item>Guild: {this.state.myself.guild}</ListGroup.Item>
                                <ListGroup.Item>Wins: {this.state.myself.wins}</ListGroup.Item>
                                <ListGroup.Item>Loss: {this.state.myself.loss}</ListGroup.Item>
                                <ListGroup.Item>Total: {this.state.myself.total}</ListGroup.Item>
                            </ListGroup>

                        </Card>
                        <div className="d-flex flex-column" style={{marginTop:50}}>
                            <ButtonGroup>
                                <Button variant="outline-secondary">Settings</Button>
                                <Button variant="outline-secondary">Store</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                    <Col sm={9} >
                        <Card style={styles.tableCard}>
                            <Card.Title style={styles.title}>Online Users</Card.Title>
                            <Card.Body>
                                {this.buildOnlineUserTable()}
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'transparent', border:'none'}} className="d-flex flex-column">
                                <Button variant="outline-success">MATCH</Button>
                            </Card.Footer>
                        </Card>
                        
                        
                    </Col>
                </Row>
                
            </Container>
        );
    }
}

export default UserDashBoard;

