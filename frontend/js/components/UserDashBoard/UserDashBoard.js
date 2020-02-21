import React, { Component } from 'react';
import { Container, Navbar, Button, Row, Col, ListGroup, Card, ButtonGroup, } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import { userActions } from '../../redux/actions/UsersActions';
import { skinsActions } from '../../redux/actions/SkinsActions';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { skins } from '../Settings/Skins';
import '../Fonts.css'



class UserDashBoard extends Component {
    constructor(props) {
        super(props)

        this.handleSignOut = this.handleSignOut.bind(this)
        this.handleMatch = this.handleMatch.bind(this)
        this.handleSettings = this.handleSettings.bind(this)
    }


    componentDidMount() {
        document.body.style.backgroundColor = "white";
        // add functionality for rendering custom skins
        // call api to load all states
        this.props.getCurrent()
        this.props.getAll()  
        this.props.getActiveSkin()
        this.props.getOwnedSkins()
    }

    handleSignOut(e) {
        e.preventDefault();
        this.props.logout()
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
                    <th>Guild</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Active?</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) =>         
                    <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.guild}</td>
                    <td>{user.games_won}</td>
                    <td>{user.games_lost}</td>
                    <td>{user.is_active ? 'Online' : 'Offline'}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        )
    }

    render() {
        const { user, users, activeSkin, getActiveSkinLoading, userLoading, usersLoading } = this.props
        const mySkin = skins[activeSkin]
        const cash = user.cash 
        
        //const mySkin = skins[0]
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
                <Navbar bg="light" className="Buttons"> 
                    <Link to='/userdashboard'>     
                        <Navbar.Brand style={{marginLeft:8, fontFamily:"'Bangers', cursive", fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Row>
                    <Col xs={3}>
                        <div style={styles.profilePic} className="d-flex flex-column">
                            {getActiveSkinLoading 
                                ? <Loading />
                                : <FontAwesomeIcon  style={mySkin.avatar.style} icon={mySkin.avatar.name} size='6x' />
                            }
                            
                        </div>
                        <Card>
                            <ListGroup variant="flush">
                                {
                                userLoading ? 
                                    <Loading/>
                                :
                                    <React.Fragment>
                                        <ListGroup.Item>Name: {user.username}</ListGroup.Item>
                                        { user.guild == "" 
                                            ? <ListGroup.Item>Guild: None</ListGroup.Item>
                                            : <ListGroup.Item>Guild: {user.guild}</ListGroup.Item>
                                        }
                                        <ListGroup.Item>ReiherRubles: ℟ {cash}</ListGroup.Item>
                                        <ListGroup.Item>Games Won: {user.games_won}</ListGroup.Item>
                                        <ListGroup.Item>Games Lost: {user.games_lost}</ListGroup.Item>
                                    </React.Fragment>
                                }
                            </ListGroup>

                        </Card>
                        <div className="d-flex flex-column" style={{marginTop: '15%', marginLeft: '2%'}}>
                            <ButtonGroup className="Buttons">
                                <Button variant="outline-info" onClick={this.handleSettings}>Settings</Button>
                                <Button variant="outline-info" onClick={this.handleStore.bind(this)}>Store</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                    <Col xs={9} >
                        <Card style={styles.tableCard}>
                            <Card.Title style={styles.title}>Top Users</Card.Title>
                            <Card.Body>
                                {usersLoading ? <Loading /> : this.buildOnlineUserTable(users)}
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
    const usersLoading = state.users.usersLoading
    const { users } = state.users
    const { activeSkin, getActiveSkinLoading } = state.skins
    const socket = state.socket.socket

    return { user, users, activeSkin, getActiveSkinLoading, userLoading, usersLoading, socket }
}

const actionCreators = {
    logout: userActions.logout,
    getAll: userActions.getAll,
    getCurrent: userActions.getCurrent,
    getActiveSkin: skinsActions.getActiveSkin,
    getOwnedSkins: skinsActions.getOwnedSkins,
}

export default connect(mapStateToProps, actionCreators)(UserDashBoard);
