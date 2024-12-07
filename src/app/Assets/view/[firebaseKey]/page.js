'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { getSingleAsset } from '../../../../api/assetData';
import { getAssetDetails } from '../../../../api/mergedData';
import AssetViewCard from '../../../../components/AssetViewCard';

export default function ViewAssets({ params }) {
  const [assetDetails, setAssetDetails] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getAssetDetails(firebaseKey)
      .then((data) => {
        setAssetDetails(data);
        console.log('Asset details with location', data);
      })
      .catch((error) => console.error('Error fetching asset:', error));
  }, [firebaseKey]);

  return <div className="d-flex flex-wrap asset-view-card">{Array.isArray(assetDetails) ? assetDetails.map((details) => <AssetViewCard key={details.firebaseKey} assetObj={details} onUpdate={getAssetDetails} />) : assetDetails && <AssetViewCard key={assetDetails.firebaseKey} assetObj={assetDetails} onUpdate={getAssetDetails} />}</div>;
}

ViewAssets.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
