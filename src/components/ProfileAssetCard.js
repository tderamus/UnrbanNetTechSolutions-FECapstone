'use client';

import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteSingleAsset } from '../api/assetData';

function ProfileAssetCard({ assetObj, onUpdate }) {
  const deleteAsset = () => {
    if (window.confirm(`Delete ${assetObj.assetNo}?`)) {
      deleteSingleAsset(assetObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={assetObj.image} alt={assetObj.description} />
      <Card.Body>
        <Card.Title>{assetObj.name}</Card.Title>
        <Card.Text>{assetObj.notes}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{assetObj.assetNo}</ListGroup.Item>
        <ListGroup.Item>{assetObj.modelNo}</ListGroup.Item>
        <ListGroup.Item>{assetObj.serialNo}</ListGroup.Item>
        <ListGroup.Item>{assetObj.type}</ListGroup.Item>
        <p className="card-text bold">
          {assetObj.isDeployed && (
            <span>
              DEPLOYED
              <br />
            </span>
          )}
        </p>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">VIEW</Card.Link>
        <Card.Link href={`/Assets/edit/${assetObj.firebaseKey}`} passHref>
          EDIT
        </Card.Link>
        <Card.Link href="#" onClick={deleteAsset}>
          DELETE
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

ProfileAssetCard.propTypes = {
  assetObj: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    assetNo: PropTypes.number,
    modelNo: PropTypes.string,
    serialNo: PropTypes.string,
    locationId: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
    isDeployed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileAssetCard;
