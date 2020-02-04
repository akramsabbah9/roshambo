import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPaper, faHandScissors, faHandRock} from '@fortawesome/free-solid-svg-icons'
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
                <FontAwesomeIcon icon={faHandPaper}/>
              </Row>
              <Row>
                <p className="Logo">Roshambo</p>
              </Row>
              <Row>
                <div className="Link">
                  <Link to="/Register" className="mr-5">Register</Link>
                  <Link to="/Login">Login</Link>
                </div>
                <FontAwesomeIcon icon={faHandScissors}/>
              </Row>
              <Row> 
               <FontAwesomeIcon icon={faHandRock}/>
              </Row>
            </Container>
                
            </div>
        )
    }
}

export default Menu;