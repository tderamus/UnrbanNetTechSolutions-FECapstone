'use client';

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ProfileAssetCard from '../../../components/ProfileAssetCard';
import { getAssetsByID } from '../../../api/assetData';
import { getLocationsByID } from '../../../api/locationData';
import ProfileCard from '../../../components/ProfileCard';
import ProfileLocationCard from '../../../components/ProfileLocationCard';

export default function UserProfile() {
  const [userDevices, setUserDevices] = useState([]);
  const [userName, setUserName] = useState('');
  const [profileLocations, setProfileLocations] = useState([]);

  const getDevicesId = () => {
    getAssetsByID()
      .then((data) => {
        setUserDevices(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };
  const showAllLocationsID = () => {
    getLocationsByID()
      .then((data) => {
        setProfileLocations(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };
  useEffect(() => {
    // Get user diaplayName from firebase authentication
    const user = firebase.auth().currentUser;
    if (user) {
      setUserName(user.displayName || 'User');
    }

    // Get user assets by UID
    getDevicesId();

    // Get user locations by UID
    showAllLocationsID();
  }, []);

  return (
    <>
      <div className="user-profile">
        <ProfileCard userData={{ name: userName }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {profileLocations.map((locations) => (
          <ProfileLocationCard key={locations.firebaseKey} profileLocationObj={locations} onUpdate={showAllLocationsID} />
        ))}
      </div>

      <div className="add-buttons">
        <Link href="/Assets/new" passHref>
          <Button type="button">Add Managed Assets</Button>
        </Link>
        <Link href="/Locations/new" passHref>
          <Button type="button">Add Managed Location</Button>
        </Link>
      </div>

      <div className="profile-asset-card">
        {userDevices.map((assets) => (
          <ProfileAssetCard key={assets.firebaseKey} assetObj={assets} onUpdate={getDevicesId} />
        ))}
      </div>
    </>
  );
}
