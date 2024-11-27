import { clientCredentials, firebase } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// API call to get all assets
const getAllAssets = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/assets.json`, {
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

// Get Assets by user ID

const getAssetsByID = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/assets.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`, {
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

// Create New Asset
const createAsset = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/assets.json`, {
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

// Update Assets
const updateAsset = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/assets/${payload.firebaseKey}.json`, {
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

export { getAllAssets, getAssetsByID, createAsset, updateAsset };
