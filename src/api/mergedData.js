import { getSingleAsset, getAssetLocation } from './assetData';
import { getSingleEmployee } from './employeeData';
import { getSingleLocation } from './locationData';

const getAssetDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleAsset(firebaseKey)
      .then((assetObject) => {
        console.log('Asset Object', assetObject);
        Promise.all([getSingleLocation(assetObject.locationId), getSingleEmployee(assetObject.assignment)]).then(([locationObject, employeeObject]) => {
          console.log('Location Object', locationObject);
          console.log('Employee Object', employeeObject);
          resolve({ locationObject, employeeObject, ...assetObject });
        });
      })
      .catch((error) => reject(error));
  });

const getLocationDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocation(firebaseKey), getAssetLocation(firebaseKey)])
      .then(([locationObject, locationArray]) => {
        console.log('location object detail', locationObject);
        resolve({ ...locationObject, locations: locationArray });
      })
      .catch((error) => reject(error));
  });
export { getAssetDetails, getLocationDetails };
