import { getSingleAsset, getAssetLocation } from './assetData';
import { getSingleLocation } from './locationData';

const getAssetDetails = (assetFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleAsset(assetFirebaseKey)
      .then((assetObject) => {
        console.log('Asset Object', assetObject);
        getSingleLocation(assetObject.locationId).then((locationObject) => {
          console.log('Location Object', locationObject);
          resolve({ locationObject, ...assetObject });
        });
      })
      .catch((error) => reject(error));
  });

const getLocationDetails = (locationFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocation(locationFirebaseKey), getAssetLocation(locationFirebaseKey)])
      .then(([locationObject, locationArray]) => {
        resolve({ ...locationObject, locations: locationArray });
      })
      .catch((error) => reject(error));
  });
export { getAssetDetails, getLocationDetails };
