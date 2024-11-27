import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function AssetCard({ assetObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={assetObj.image} alt={assetObj.description} />
      <Card.Body>
        <Card.Title>{assetObj.name}</Card.Title>
        <Card.Text>{assetObj.notes}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
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
  }).isRequired,
};

export default AssetCard;
