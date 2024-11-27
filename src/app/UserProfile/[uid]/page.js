'use client';

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import ProfileAssetCard from '../../../components/ProfileAssetCard';
import { getAssetsByID } from '../../../api/assetData';
import ProfileCard from '../../../components/ProfileCard';

export default function UserProfile() {
  const [userDevices, setUserDevices] = useState([]);
  const [userName, setUserName] = useState('');

  const getDevicesId = () => {
    getAssetsByID()
      .then((data) => {
        setUserDevices(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };

  useEffect(() => {
    // Get user diaplayName from firebase authentication
    const user = firebase.auth().currentUser;
    if (user) {
      console.log(user);
      setUserName(user.displayName || 'User');
    }

    // Get user assets by UID
    getDevicesId();
  }, []);

  return (
    <>
      <div>
        <ProfileCard userData={{ name: userName }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {userDevices.map((assets) => (
          <ProfileAssetCard key={assets.firebaseKey} assetObj={assets} onUpdate={getDevicesId} />
        ))}
      </div>
    </>
  );
}
