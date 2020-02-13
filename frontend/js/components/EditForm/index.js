import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';

const propTypes = {
  handleEdit: PropTypes.func.isRequired
};

class EditForm extends Component {
  state = {
    'field-type': '',
    'field-value': ''
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      let newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="edit-group">
          <Form.Label>Which field to edit?</Form.Label>
          <Form.Control name="field-type" onChange={this.handleChange} placeholder="email" />
          <Form.Label>What new value to give it?</Form.Label>
          <Form.Control name="field-value" onChange={this.handleChange} placeholder="roshambolicious@roshambo.bo" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => this.props.handleEdit(e, this.state)}>
          Submit
        </Button>
      </Form>
    );
  }
}

EditForm.propTypes = propTypes;

export default EditForm;
