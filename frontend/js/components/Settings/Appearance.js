import React, { Component } from 'react';
import { Container, Navbar, Button , Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skinsActions } from '../../redux/actions/SkinsActions';
import { connect } from 'react-redux';
import { skins } from './Skins';
import { history } from '../../utils/history'
import { Link } from 'react-router-dom';


class Appearance extends Component {
    constructor(props) {
        super(props)

        this.handleSignOut = this.handleSignOut.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleChangeDefault = this.handleChangeDefault.bind(this)
    }

    addProductCards(skins, activeSkin) {
        const cards = skins.map((skin, index) => (
            <Col key={index}>
                <Card>
                    <Card.Header className="col d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon style={skin.avatar.style} icon={skin.avatar.name} size='10x'/>
                    </Card.Header>
                    <Card.Body>
                        { (skin.id == activeSkin)  
                            ? <Card.Title style={{textAlign: 'center'}}>{skin.name} (current skin)</Card.Title> 
                            : <Card.Title style={{textAlign: 'center'}}>{skin.name}</Card.Title> 
                        }
                        <Card.Text style={{textAlign: 'center'}}>{skin.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="col d-flex align-items-center justify-content-center">
                        <Button onClick={() => this.handleChangeDefault(skin.id)} disabled={(skin.id == activeSkin)}>Set as Deafult</Button>
                    </Card.Footer>
                </Card>
                <div style={{margin:50}} />
            </Col>
           
        ))

        return cards
    }

    handleChangeDefault(id) {
        this.props.changeSkin(this.props.ownedSkins, id)
    }

    handleSignOut(e){
        e.preventDefault();
        history.push('/login');
    }

    handleBack(e) {
        e.preventDefault()
        history.push('/Settings')
    }

    render() {
        const { ownedSkins, activeSkin } = this.props
        const renderSkins = skins.filter((skin) => {
            if (ownedSkins.some(ownedSkin => ownedSkin == skin.id)) {
                return skin
            }
        })
        console.log(activeSkin)
        const styles = {
            signOutBtn: {
                marginLeft: '76%',
                justifySelf: 'center'
            }
        }

        return(
            <Container>
                <Navbar bg="light"> 
                    <Link to='/userdashboard'>     
                        <Navbar.Brand style={{marginLeft:8, fontFamily:"'Bangers', cursive", fontSize:"30px"}}>Roshambo</Navbar.Brand>
                    </Link> 
                    <Button style={styles.signOutBtn} variant="outline-danger" onClick={this.handleSignOut}>Sign Out</Button>
                </Navbar>
                <Col>
                    <h1 style={{marginTop:10, marginBottom: 10}}>Change Skins</h1>
                </Col>
                    {this.addProductCards(renderSkins, activeSkin)}

                <Col className="col d-flex align-items-center justify-content-center">
                    <Button style={{margin:30}} onClick={this.handleBack}>Back</Button>
                </Col>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    const { ownedSkins, activeSkin } = state.skins;
    return { ownedSkins, activeSkin };
}

const actionCreators = {
    changeSkin: skinsActions.change
}

export default connect(mapStateToProps, actionCreators)(Appearance);