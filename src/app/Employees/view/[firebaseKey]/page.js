'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getEmployeeDetails } from '../../../../api/mergedData';
import EmployeeAssetViewCard from '../../../../components/EmployeeAssetViewCard';

export default function ViewEmployeeDetails({ params }) {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeAssets, setEmployeeAssets] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getEmployeeDetails(firebaseKey)
      .then((data) => {
        setEmployeeDetails(data);
        setEmployeeAssets(Object.values(data.assetsObject || {}));
        // console.log('assets array', data.assetsObject);
      })
      .catch((error) => console.error('Error fetching asset:', error));
  }, [firebaseKey]);

  // useEffect(() => {
  //   console.log('employee details', employeeDetails);
  //   console.log('employee assets', employeeAssets);
  // }, [employeeDetails, employeeAssets]);

  return <div className="d-flex flex-wrap asset-view-card">{employeeAssets.length > 0 ? employeeAssets.map((asset) => <EmployeeAssetViewCard key={asset.firebaseKey} assetObj={{ ...asset, ...employeeDetails }} onUpdate={() => getEmployeeDetails(firebaseKey)} />) : <p>No assets available for this employee.</p>}</div>;
}

ViewEmployeeDetails.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
