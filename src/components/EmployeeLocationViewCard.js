'user client';

import PropTypes from 'prop-types';
import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function EmployeeLocationViewCard({ locationObj }) {
  return (
    <div className="employee-location-view-cards">
      <div>
        <Card style={{ width: '18rem' }}>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="location-data">
              {locationObj.city}, {locationObj.state}
            </ListGroupItem>
            <ListGroupItem className="employee-data">
              {locationObj.first_name}, {locationObj.last_name}
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
}

EmployeeLocationViewCard.propTypes = {
  locationObj: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
