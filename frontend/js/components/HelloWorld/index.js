import React from 'react';
import {Button} from 'react-bootstrap';

const HelloWorld = () => {
  return (
    <React.Fragment>
      <p>Hello, world!</p>
      <Button variant="success">Success</Button>
      <br/>
      <Button variant="warning">Dark</Button>
      <br/>
      <Button variant="dark">Dark</Button>
    </React.Fragment>
  );
}

export default HelloWorld;
