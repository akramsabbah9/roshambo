import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPaper, faHandScissors, faHandRock} from '@fortawesome/free-regular-svg-icons'
import './Menu.css'

class Menu extends Component{
    componentDidMount(){
        document.body.style.backgroundColor = '#fab6b6';
    }
    render(){
        return(
            <div>
            <Container className="Menu">
              <Row>
                <Col sm={{offset: 7}}>
                <FontAwesomeIcon className="Paper" icon={faHandPaper} size="7x"/>
                </Col>
              </Row>
              <Row>
                <Col sm={7}>
                <p className="Logo">Roshambo</p>
                </Col>
                <FontAwesomeIcon className="Scissor" icon={faHandScissors} size="7x"/>
              </Row>
              <Row>
                <Col sm={7}>
                  <div className="Link">
                    <Link to="/Register" className="mr-5">Register</Link>
                    <Link to="/Login">Login</Link>
                  </div>
                  </Col>
                  <Col>
                  <FontAwesomeIcon icon={faHandRock} size="7x"/>
                  </Col>
              </Row>
            </Container>
                
            </div>
        )
    }
}

export default Menu;