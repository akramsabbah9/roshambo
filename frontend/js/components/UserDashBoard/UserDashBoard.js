import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, Image, Card, ListGroup, Title, ButtonGroup, Nav } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { faMehRollingEyes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import { userActions } from '../../redux/actions/UsersActions';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import '../Game.css'


class UserDashBoard extends Component {
    constructor(props) {
        super(props)

        //this.props.getCurrent()
        this.state = {
            currentUserLoading: false,
        }

        this.handleSignOut = this.handleSignOut.bind(this)
        this.handleMatch = this.handleMatch.bind(this)
        this.handleSettings = this.handleSettings.bind(this)
    }
    
    componentDidMount() {
        document.body.style.backgroundColor = "white";
        // add functionality for rendering custom skins
        // dispatch to get all users
        this.props.getCurrent()
        this.props.getAll()  
    }

    handleSignOut(e) {
        e.preventDefault();
        history.push('/login');
    }

    handleMatch(e) {
        e.preventDefault()
        history.push('/gamelobby')
    }

    handleStore() {
        history.push('/store')
    }

    handleSettings(e) {
        e.preventDefault()
        history.push('/settings');
        
    }

    buildOnlineUserTable (users) {
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
                {users.map((user, index) =>         
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
        const { user, users, activeSkin, userLoading } = this.props
        const mySkin = skins[activeSkin]
        const styles = {
            profilePic: {
                marginTop: 30,
                marginLeft: '25%',
                marginBottom: 30,
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
                justifySelf: 'center',
                fontFamily:"'Bangers', cursive", 
                fontSize:"20px"
            }
        }

        return (
            <Container className="Words">
                <Navbar bg="light"> 
                    <Link to='/userdashboard'>     
                        <Navbar.Brand style={{marginLeft:8, fontFamily:"'Bangers', cursive", fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger"  style={styles.signOutBtn} onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Row>
                    <Col xs={3}>
                        <div style={styles.profilePic} className="d-flex flex-column">
                            <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
                        </div>
                        <Card>
                            <ListGroup variant="flush">
                                {console.log(userLoading)}
                                <h5>Loading</h5>
                            </ListGroup>

                        </Card>
                        <div className="d-flex flex-column" style={{marginTop: '4%', marginRight: '5%'}}>
                            <ButtonGroup className="Buttons">
                                <Button variant="outline-info" onClick={this.handleSettings}>Settings</Button>
                                <Button variant="outline-info" onClick={this.handleStore.bind(this)}>Store</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                    <Col xs={9} >
                        <Card style={styles.tableCard}>
                            <Card.Title style={styles.title}>Online Users</Card.Title>
                            <Card.Body>
                                {this.buildOnlineUserTable(users)}
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'transparent', border:'none'}} className="d-flex flex-column">
                                <Button variant="outline-success" onClick={this.handleMatch} className=
                                "Buttons">MATCH</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>  
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const user = state.user.currentUser
    const userLoading = state.user.userLoading
    const { users } = state.users
    const { activeSkin } = state.skins
    return { user, users, activeSkin, userLoading }
}

const actionCreators = {
    getAll: userActions.getAll,
    getCurrent: userActions.getCurrent
}

export default connect(mapStateToProps, actionCreators)(UserDashBoard);

/*

                                <ListGroup.Item>Wins: {user.wins}</ListGroup.Item>
                                <ListGroup.Item>Loss: {user.loss}</ListGroup.Item>
                                <ListGroup.Item>Total: {user.total}</ListGroup.Item>



                                                                {userLoading 
                                    ? (<h1>Loading</h1>) 
                                    : ( <div>
                                            <ListGroup.Item>Name: {user.username}</ListGroup.Item>
                                            <ListGroup.Item>Rank: {user.rank}</ListGroup.Item>
                                            <ListGroup.Item>Guild: {user.guild}</ListGroup.Item>
                                        </div>
                                )}
*/