import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function AssetViewCard({ assetObj }) {
  // get assetObj data into locationObj to include location by asset locationId
  const { locationObject, employeeObject, ...asset } = assetObj;
  // console.log('locationObject', locationObject);
  // console.log('employeeObject', employeeObject);

  return (
    <Card style={{ width: '30rem', height: '40rem' }}>
      <Card.Img variant="top" src={asset.image} alt={asset.description} className="card-image" />
      <Card.Body>
        <Card.Title> Asset Name: {asset.name}</Card.Title>
        <Card.Text> Deployment Notes: {asset.notes}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush list-group">
        <ListGroup.Item>Asset Price: {asset.price}</ListGroup.Item>
        <ListGroup.Item>Asset No: {asset.assetNo}</ListGroup.Item>
        <ListGroup.Item>Model No: {asset.modelNo}</ListGroup.Item>
        <ListGroup.Item>Serial No: {asset.serialNo}</ListGroup.Item>
        <ListGroup.Item>Asset Type: {asset.type}</ListGroup.Item>
        <ListGroup.Item>Location: {[locationObject?.city, ' ', locationObject.state] || 'No location found'}</ListGroup.Item>
        <ListGroup.Item>Assigned To: {[employeeObject?.first_name, ' ', employeeObject.last_name] || 'No employee found'}</ListGroup.Item>
        <p className="card-text bold deployed">
          {asset.isDeployed && (
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
    locationObject: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    employeeObject: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};

export default AssetViewCard;
