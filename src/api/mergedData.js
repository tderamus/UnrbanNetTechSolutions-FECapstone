import { getSingleAsset, getAllAssets, getAssetsByAssignment } from './assetData';
import { getSingleEmployee } from './employeeData';
import { getSingleLocation } from './locationData';

const getAssetDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleAsset(firebaseKey)
      .then((assetObject) => {
        Promise.all([getSingleLocation(assetObject.locationId), getSingleEmployee(assetObject.assignment)]).then(([locationObject, employeeObject]) => {
          resolve({ locationObject, employeeObject, ...assetObject });
        });
      })
      .catch((error) => reject(error));
  });

const getEmployeeDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleEmployee(firebaseKey)
      .then((employeeObject) => {
        getAssetsByAssignment(employeeObject.firebaseKey)
          .then((assetsObject) => {
            resolve({ assetsObject, ...employeeObject });
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

const getLocationDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleLocation(firebaseKey)
      .then((locationObject) => {
        console.log('Location Object Detail', locationObject);
        Promise.all([getAllAssets(locationObject.city)]).then(([assetsObject]) => {
          console.log('Resolved Assets Object', assetsObject);
          resolve({ assetsObject, ...locationObject });
        });
      })
      .catch((error) => reject(error));
  });

export { getAssetDetails, getLocationDetails, getEmployeeDetails };
