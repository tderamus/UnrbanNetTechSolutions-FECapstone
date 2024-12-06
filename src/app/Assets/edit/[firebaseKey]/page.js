'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AssetForm from '../../../../components/forms/AssetForm';
import { getSingleAsset } from '../../../../api/assetData';

export default function EditAsset({ params }) {
  const [editAsset, setEditAsset] = useState({});

  // Get the asset's firebaseKey
  const { firebaseKey } = params;

  // make api call to get asset data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getSingleAsset(firebaseKey)
      .then((data) => {
        setEditAsset(data);
      })
      .catch((error) => console.error('Error fetching asset:', error));
  }, [firebaseKey]);

  // Pass the asset object to the form
  return <AssetForm obj={editAsset} />;
}

EditAsset.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
