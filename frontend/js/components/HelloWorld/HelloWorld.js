import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container,
Col} from 'react-bootstrap';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import Next from './Next';

class HelloWorld extends Component{
    render(){
        return(
           <div>
            <p>Hello World!!</p>
            <Link to='/HelloWorld/:Next'>Next</Link>
            <BrowserRouter>
                <Route exact path='/HelloWorld/:Next' component={Next}/>
            </BrowserRouter>
           </div>  
        )
    }
}

export default HelloWorld;