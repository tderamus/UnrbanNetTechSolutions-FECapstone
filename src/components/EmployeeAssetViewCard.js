'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { deleteSingleEmployee } from '../api/employeeData';

export default function EmployeeAssetViewCard({ assetObj, onUpdate }) {
  const deleteEmployee = () => {
    if (window.confirm(`Delete ${assetObj.first_name}?`)) {
      deleteSingleEmployee(assetObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="employee-asset-view-cards">
        <div>
          <Card style={{ width: '18rem' }}>
            <ListGroup className="list-group-flush ">
              <ListGroup.Item className="employee-data">
                {assetObj.first_name}, {assetObj.last_name}
                <Card.Link href={`/Employees/view/${assetObj.firebaseKey}`}>📃</Card.Link>
                <Card.Link href={`/Employees/edit/${assetObj.firebaseKey}`}>🖋</Card.Link>
                <Card.Link href="#" onClick={deleteEmployee}>
                  ❌
                </Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img className="card-image" variant="top" src={assetObj.image} alt={assetObj.description} />
            <Card.Body className="">
              <Card.Title>{assetObj.name}</Card.Title>
              <Card.Text className="asset-notes">{assetObj.notes}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
  );
}

EmployeeAssetViewCard.propTypes = {
  assetObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    locationCity: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
