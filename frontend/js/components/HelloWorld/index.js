import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';

const HelloWorld = () => {
  return (
    <>
    <p>Hello, world!</p>
    <Button variant = "success">Success</Button>
    <Button variant = "primary">Error</Button>
    </>
  );
}

export default HelloWorld;
