'use client';

import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { deleteSingleAsset } from '../api/assetData';

function ProfileAssetCard({ assetObj, onUpdate }) {
  const deleteAsset = () => {
    if (window.confirm(`Delete ${assetObj.assetNo}?`)) {
      deleteSingleAsset(assetObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', height: '18rem' }} className="profile-asset">
      <Card.Img variant="top" src={assetObj.image} alt={assetObj.description} className="card-image" />
      <Card.Body>
        <Card.Title>Name: {assetObj.name}</Card.Title>
      </Card.Body>
      <div className="card-footer card-actions">
        <Card.Body className="asset-actions">
          <Card.Link href={`/Assets/view/${assetObj.firebaseKey}`} passHref>
            DETAILS
          </Card.Link>
          <Card.Link href={`/Assets/edit/${assetObj.firebaseKey}`} passHref>
            EDIT
          </Card.Link>
          <Card.Link href="#" onClick={deleteAsset}>
            DELETE
          </Card.Link>
        </Card.Body>
      </div>
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
