import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandRock, faHandPeace} from '@fortawesome/free-regular-svg-icons';
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
                <Col sm={5}>
                <p className="Logo">Roshambo</p>
                </Col>
                <Col sm={2}>
                <FontAwesomeIcon className="toRight" icon={faHandPaper} size="7x"/>
                </Col>
                <FontAwesomeIcon className="toLeft" icon={faHandPeace} size="7x"/>
              </Row>
              <Row>
                <Col sm={5}>
                  <div className="Link">
                    <Link to="/Register" className="mr-5" style={{color: '#b3d7ff'}}>Register</Link>
                    <Link to="/Login" style={{color: '#b3d7ff'}}>Login</Link>
                  </div>
                  </Col>
                  <Col sm={2}>
                  <FontAwesomeIcon icon={faHandRock} className="toRight" size="7x"/>
                  </Col>
                  <FontAwesomeIcon className="toLeft" icon={faHandPaper} size="7x"/>
              </Row>
            </Container>
                
            </div>
        )
    }
}

export default Menu;