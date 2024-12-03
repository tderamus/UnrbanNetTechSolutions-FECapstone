'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

export default function ProfileAssetLocationViewCard(assetDetail, ...locationObj) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {locationObj.city}, {locationObj.state}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

ProfileAssetLocationViewCard.propTypes = {
  locationObj: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
