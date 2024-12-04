import { getSingleAsset, getAssetLocation } from './assetData';
import { getSingleLocation } from './locationData';

const getAssetDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleAsset(firebaseKey)
      .then((assetObject) => {
        console.log('Asset Object', assetObject);
        getSingleLocation(assetObject.locationId).then((locationObject) => {
          console.log('Location Object', locationObject);
          resolve({ locationObject, ...assetObject });
        });
      })
      .catch((error) => reject(error));
  });

const getLocationDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocation(firebaseKey), getAssetLocation(firebaseKey)])
      .then(([locationObject, locationArray]) => {
        resolve({ ...locationObject, locations: locationArray });
      })
      .catch((error) => reject(error));
  });
export { getAssetDetails, getLocationDetails };
