'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

export default function LocationCard({ locationObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{locationObj.city}</ListGroup.Item>
          <ListGroup.Item>{locationObj.state}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">EDIT</Card.Link>
          <Card.Link href="#">DELETE</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
