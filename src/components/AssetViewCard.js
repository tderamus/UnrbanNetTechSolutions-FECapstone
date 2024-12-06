import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function AssetViewCard({ assetObj }) {
  return (
    <Card style={{ width: '40rem' }}>
      <Card.Img variant="top" src={assetObj.image} alt={assetObj.description} className="card-image" />
      <Card.Body>
        <Card.Title> Asset Name: {assetObj.name}</Card.Title>
        <Card.Text> Deployment Notes: {assetObj.notes}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush list-group">
        <ListGroup.Item>Asset No: {assetObj.assetNo}</ListGroup.Item>
        <ListGroup.Item>Model No: {assetObj.modelNo}</ListGroup.Item>
        <ListGroup.Item>Serial No: {assetObj.serialNo}</ListGroup.Item>
        <ListGroup.Item>Asset Type: {assetObj.type}</ListGroup.Item>
        <p className="card-text bold">
          {assetObj.isDeployed && (
            <span>
              DEPLOYED
              <br />
            </span>
          )}
        </p>
      </ListGroup>
    </Card>
  );
}

AssetViewCard.propTypes = {
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

export default AssetViewCard;
