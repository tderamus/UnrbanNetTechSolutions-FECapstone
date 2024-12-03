import { clientCredentials, firebase } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get All Locations

const getAllLocations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// Get Locations By UID
const getLocationsByID = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// Create New Location
const createLocation = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Update Location
const updateLocation = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Get Single Location
const getSingleLocation = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        resolve(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        reject(error);
      });
  });

// Delete Location
const deleteSingleLocation = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllLocations, getLocationsByID, createLocation, updateLocation, getSingleLocation, deleteSingleLocation };
