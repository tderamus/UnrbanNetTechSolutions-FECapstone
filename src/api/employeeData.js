import { clientCredentials, firebase } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get All Locations

const getAllEmployees = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees.json`, {
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
const getEmployeesByID = () =>
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
const createEmployee = (payload) =>
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
const updateEmployee = (payload) =>
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
// const getSingleEmployee = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/locations/${firebaseKey}.json`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           resolve(Object.values(data));
//         } else {
//           resolve([]);
//         }
//       })
//       .catch(reject);
//   });

const getSingleEmployee = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
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

export { getAllEmployees, getEmployeesByID, createEmployee, updateEmployee, getSingleEmployee, deleteSingleLocation };
