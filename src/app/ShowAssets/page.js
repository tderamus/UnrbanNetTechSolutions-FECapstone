'use client';

import React, { useEffect, useState } from 'react';
import AssetCard from '../../components/AssetCard';
import { getAllAssets } from '../../api/assetData';
import { getAllLocations } from '../../api/locationData'; // Assuming you have this function

export default function ShowAssets() {
  const [devices, setDevices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [assetsLocations, setassetsLocations] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  // Fetch all devices
  const getDevices = async () => {
    try {
      const assets = await getAllAssets();
      setDevices(assets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  // Fetch all locations
  const getLocations = async () => {
    try {
      const locs = await getAllLocations();
      setLocations(locs);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Combine devices with location city
  useEffect(() => {
    if (devices.length && locations.length) {
      const assetsLocs = devices.map((device) => {
        const location = locations.find((loc) => loc.firebaseKey === device.locationId);
        // console.log('location data', location);
        // console.log('device data', device);
        return { ...device, locationCity: location?.city || 'Unknown' };
      });
      setassetsLocations(assetsLocs);
    }
  }, [devices, locations]);

  useEffect(() => {
    getDevices();
    getLocations();
  }, []);

  // Handle search input change
  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  // Filter assets based on location city
  const searchResults = assetsLocations.filter((device) => device.locationCity.toLowerCase().includes(searchItem.toLowerCase()));

  return (
    <>
      <div className="search-bar-container">
        <input
          style={{
            width: '400px',
            display: 'block',
            margin: '0 auto',
            borderRadius: '7px',
            marginTop: '15px',
          }}
          type="search"
          placeholder="Search assets by location city"
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <div className="show-asset-card">
        {searchResults.map((assets) => (
          <AssetCard key={assets.firebaseKey} assetObj={assets} onUpdate={getDevices} />
        ))}
      </div>
    </>
  );
}
