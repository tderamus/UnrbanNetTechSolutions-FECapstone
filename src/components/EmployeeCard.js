'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

export default function EmployeeCard({ employeeObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="employee-data">
            {employeeObj.first_name}, {employeeObj.last_name}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

EmployeeCard.propTypes = {
  employeeObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
};
