import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";


class Erehwon extends Component {
    render(){
        return(
            <Container>
                <div style={{marginTop: '25%'}}/>
                <Col className="col d-flex align-items-center justify-content-center">
                    <Row>
                        <FontAwesomeIcon icon={faMinusCircle} style={{color: 'red'}} size='6x' />
                        <h1 style={{marginLeft: 40, marginTop: 17}}>404 Page Not Found</h1>
                    </Row>
                </Col>
            </Container>
        )
    }
}

export default Erehwon;