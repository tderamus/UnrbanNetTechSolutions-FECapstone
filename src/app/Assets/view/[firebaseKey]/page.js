'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleAsset } from '../../../../api/assetData';
import AssetViewCard from '../../../../components/AssetViewCard';

export default function ViewAssets({ params }) {
  const [assetDetails, setAssetDetails] = useState([]);
  // const [assetLocations, setAssetLocations] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getSingleAsset(firebaseKey)
      .then((data) => {
        setAssetDetails(data);
        console.log('data', data);
      })
      .catch((error) => console.error('Error fetching asset:', error));
  }, [firebaseKey]);

  return <div className="d-flex flex-wrap asset-view-card">{Array.isArray(assetDetails) ? assetDetails.map((details) => <AssetViewCard key={details.firebaseKey} assetObj={details} onUpdate={getSingleAsset} />) : assetDetails && <AssetViewCard key={assetDetails.firebaseKey} assetObj={assetDetails} onUpdate={getSingleAsset} />}</div>;
}

ViewAssets.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
