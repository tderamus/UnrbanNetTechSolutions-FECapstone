'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { getAssetDetails, getLocationDetails } from '@/api/mergedData';
import { getAssetLocation } from '../../../../api/assetData';
import ProfileAssetCard from '../../../../components/ProfileAssetCard';
import { getSingleLocation } from '../../../../api/locationData';

export default function ViewAssets({ params }) {
  const [assetDetails, setAssetDetails] = useState({});
  const [assetLocations, setAssetLocations] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    getAssetDetails(firebaseKey).then((data) => {
      setAssetDetails(data);
      // console.log('data', data);
    });

    getLocationDetails(firebaseKey).then((data) => {
      setAssetLocations(data);
      console.log('location data', data);
    });
  }, [firebaseKey]);

  const getAssetLocationDetail = () => {
    getAssetLocation(firebaseKey).then((data) => {
      setAssetLocations(data);
    });
  };

  getSingleLocation(firebaseKey).then((data) => {
    console.log('single location data', data);
  });

  return (
    <>
      {Array.isArray(assetLocations) && assetLocations.length > 0 ? (
        assetLocations.map((location) => (
          <Card style={{ width: '18rem', margin: '10px' }} key={location.firebaseKey}>
            <ListGroup variant="flush">
              <ListGroup.Item>{location.city}</ListGroup.Item>
              <ListGroup.Item>{location.state}</ListGroup.Item>
              <ListGroup.Item>
                {assetDetails.isDeployed && (
                  <span>
                    DEPLOYED
                    <br />
                  </span>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      ) : (
        <div>No locations available</div>
      )}
      <div className="d-flex flex-wrap">{Array.isArray(assetDetails.assets) ? assetDetails.assets.map((assetDetail) => <ProfileAssetCard key={assetDetail.firebaseKey} assetObj={assetDetail} onUpdate={getAssetLocationDetail} />) : <div>No assets available</div>}</div>
    </>
  );
}

ViewAssets.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
