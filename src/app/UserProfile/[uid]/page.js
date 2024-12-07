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
import ProfileEmployeeCard from '../../../components/ProfileEmployeeCard';
import { getEmployeesByID } from '../../../api/employeeData';

export default function UserProfile() {
  const [userDevices, setUserDevices] = useState([]);
  const [userName, setUserName] = useState('');
  const [profileLocations, setProfileLocations] = useState([]);
  const [profileEmployees, setProfileEmployees] = useState([]);

  const getDevicesId = () => {
    getAssetsByID()
      .then((data) => {
        setUserDevices(data);
      })
      .catch((error) => {
        console.error('error fetching asset data', error);
      });
  };
  const showAllLocationsID = () => {
    getLocationsByID()
      .then((data) => {
        setProfileLocations(data);
      })
      .catch((error) => {
        console.error('error fetching location data', error);
      });
  };

  const showAllEmployeesID = () => {
    getEmployeesByID()
      .then((data) => {
        console.log('single employee', data);
        setProfileEmployees(data);
      })
      .catch((error) => {
        console.error('error fetching employee data', error);
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

    // Get employees b UID
    showAllEmployeesID();
  }, []);

  return (
    <>
      <div className="user-profile">
        <ProfileCard userData={{ name: userName }} />
      </div>
      <h2 className="user-locations">User Managed Locations:</h2>
      <div className="profile-location-card">
        {profileLocations.map((locations) => (
          <ProfileLocationCard key={locations.firebaseKey} profileLocationObj={locations} onUpdate={showAllLocationsID} />
        ))}
      </div>
      <h2 className="user-employees">User Managed Employees:</h2>
      <div className="profile-employee-card">
        {profileEmployees.map((employee) => (
          <ProfileEmployeeCard key={employee.firebaseKey} profileEmployeeObj={employee} onUpdate={showAllEmployeesID} />
        ))}
      </div>

      <div className="add-buttons">
        <Link href="/Assets/new" passHref>
          <Button type="button">Add Managed Assets</Button>
        </Link>
        <Link href="/Locations/new" passHref>
          <Button type="button">Add Managed Location</Button>
        </Link>
        <Link href="/Employees/new" passHref>
          <Button type="button">Add Managed Employee</Button>
        </Link>
      </div>
      <h2 className="user-assets">User Managed Assets:</h2>
      <div className="profile-asset-card">
        {userDevices.map((assets) => (
          <ProfileAssetCard key={assets.firebaseKey} assetObj={assets} onUpdate={getDevicesId} />
        ))}
      </div>
    </>
  );
}
