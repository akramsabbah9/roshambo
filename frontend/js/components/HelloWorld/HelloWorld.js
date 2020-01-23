import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class HelloWorld extends Component{
    render(){
        return(
           <div>
            <p>Hello World!!</p>
           </div>
        )
    }
}

export default HelloWorld;