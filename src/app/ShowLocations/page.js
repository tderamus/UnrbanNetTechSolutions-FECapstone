'use client';

import React, { useEffect, useState } from 'react';
import { getAllLocations } from '../../api/locationData';
import LocationCard from '../../components/LocationCard';

export default function ShowLocations() {
  const [assetLocations, setAssetLocations] = useState([]);

  const showAllLocations = () => {
    getAllLocations()
      .then((data) => {
        setAssetLocations(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };

  useEffect(() => {
    showAllLocations();
  }, []);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {assetLocations.map((locations) => (
        <LocationCard key={locations.firebaseKey} locationObj={locations} />
      ))}
    </div>
  );
}
