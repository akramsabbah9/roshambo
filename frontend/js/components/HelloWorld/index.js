import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const HelloWorld = () => {
  return (
    <>
    <p>Hello, world!</p>
    <Button variant="success">Success</Button>
    <br/>
    <Button variant="warning">Dark</Button>
    <br/>
    <Button variant="dark">Dark</Button>
    </>
  );
}

export default HelloWorld;
