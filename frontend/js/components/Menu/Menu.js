import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandRock, faHandPeace } from '@fortawesome/free-regular-svg-icons';
import './Menu.css';

class Menu extends Component{
    componentDidMount(){
        document.body.style.backgroundColor = '#74A499';
    }
    render(){
        return(
            <div>
            <Container className="Menu">
              <Row>
                <Col xs={5}>
                <p className="Logo">Roshambo</p>
                </Col>
                <Col xs={2}>
                <FontAwesomeIcon className="toRight Icon" icon={faHandPaper} size="7x"/>
                </Col>
                <FontAwesomeIcon className="toLeft Icon" icon={faHandPeace} size="7x"/>
              </Row>
              <Row>
                <Col xs={5}>
                  <div className="Link">
                    <Link to="/Register" className="mr-5" style={{color: '#b3d7ff'}}>Register</Link>
                    <Link to="/Login" style={{color: '#b3d7ff'}}>Login</Link>
                  </div>
                  </Col>
                  <Col xs={2}>
                  <FontAwesomeIcon icon={faHandRock} className="toRight Icon" size="7x"/>
                  </Col>
                  <FontAwesomeIcon className="toLeft Icon" icon={faHandPaper} size="7x"/>
              </Row>
            </Container>   
            </div>
        )
    }
}

export default Menu;