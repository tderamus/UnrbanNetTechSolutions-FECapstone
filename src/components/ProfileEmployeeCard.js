'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { deleteSingleEmployee } from '../api/employeeData';

export default function ProfileEmployeeCard({ profileEmployeeObj, onUpdate }) {
  const deleteEmployee = () => {
    if (window.confirm(`Delete ${profileEmployeeObj.first_name}?`)) {
      deleteSingleEmployee(profileEmployeeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <ListGroup className="list-group-flush ">
          <ListGroup.Item className="employee-data">
            {profileEmployeeObj.first_name}, {profileEmployeeObj.last_name}
            <Card.Link href={`/Employees/view/${profileEmployeeObj.firebaseKey}`}>📃</Card.Link>
            <Card.Link href={`/Employees/edit/${profileEmployeeObj.firebaseKey}`}>🖋</Card.Link>
            <Card.Link href="#" onClick={deleteEmployee}>
              ❌
            </Card.Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

ProfileEmployeeCard.propTypes = {
  profileEmployeeObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
