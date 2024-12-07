import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';

function AssetCard({ assetObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img className="card-image" variant="top" src={assetObj.image} alt={assetObj.description} />
      <Card.Body className="">
        <Card.Title>{assetObj.name}</Card.Title>
        <Card.Text className="asset-notes">{assetObj.notes}</Card.Text>
      </Card.Body>
    </Card>
  );
}

AssetCard.propTypes = {
  assetObj: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    assetNo: PropTypes.number,
    modelNo: PropTypes.string,
    serialNo: PropTypes.string,
    type: PropTypes.string,
    isDeployed: PropTypes.bool,
  }).isRequired,
};

export default AssetCard;
