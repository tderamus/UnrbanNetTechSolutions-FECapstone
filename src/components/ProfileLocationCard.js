'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { deleteSingleLocation } from '../api/locationData';

export default function ProfileLocationCard({ profileLocationObj, onUpdate }) {
  const deleteLocation = () => {
    if (window.confirm(`Delete ${profileLocationObj.city}?`)) {
      deleteSingleLocation(profileLocationObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {profileLocationObj.city}, {profileLocationObj.state}
            <Card.Link href={`/Locations/edit/${profileLocationObj.firebaseKey}`}>EDIT</Card.Link>
            <Card.Link href="#" onClick={deleteLocation}>
              DELETE
            </Card.Link>
          </ListGroup.Item>
        </ListGroup>
        {/* <Card.Body>
          
        </Card.Body> */}
      </Card>
    </div>
  );
}

ProfileLocationCard.propTypes = {
  profileLocationObj: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
