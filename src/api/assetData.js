import { clientCredentials } from '../utils/client';

// API call to get all assets

const endpoint = clientCredentials.databaseURL;

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
          console.warn('API', data);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export default getAllAssets;
