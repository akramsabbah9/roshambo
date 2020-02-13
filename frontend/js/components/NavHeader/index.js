import React from 'react';
import PropTypes from 'prop-types';

import { Button, Nav, Navbar } from 'react-bootstrap';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
}

const NavHeader = (props) => {
  const loggedOutNav = (
    <React.Fragment>
      <Nav.Link onClick={() => props.displayForm('login')} className="mr-sm-2">Log In</Nav.Link>
      <Button onClick={() => props.displayForm('signup')} variant="outline-light">Sign Up</Button>
    </React.Fragment>
  );

  const loggedInNav = (
    <React.Fragment>
      <Nav.Link onClick={() => props.displayForm('edit')} className="mr-sm-2">Edit Details</Nav.Link>
      <Button onClick={props.handleLogout} variant="outline-light">Log Out</Button>
    </React.Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Roshambo</Navbar.Brand>
      <Nav className="float-right">
        <Nav.Link href="#home">Home</Nav.Link>
        {props.loggedIn ? loggedInNav : loggedOutNav}
      </Nav>
    </Navbar>
  );
}

Navbar.propTypes = propTypes;

export default NavHeader;
