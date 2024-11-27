'use client';

import React, { useEffect, useState } from 'react';
import AssetCard from '../../components/AssetCard';
import { getAllAssets } from '../../api/assetData';

export default function ShowAssets() {
  const [devices, setDevices] = useState([]);

  const getDevices = () => {
    getAllAssets()
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {devices.map((assets) => (
        <AssetCard key={assets.firebaseKey} assetObj={assets} onUpdate={getDevices} />
      ))}
    </div>
  );
}
