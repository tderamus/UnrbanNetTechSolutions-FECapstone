import { clientCredentials, firebase } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get All Employees
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

// Get Employees By UID
const getEmployeesByID = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`, {
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

// Create New Employee
const createEmployee = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees.json`, {
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

// Update Employee
const updateEmployee = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees/${payload.firebaseKey}.json`, {
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

// Get Single Employee
const getSingleEmployee = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Delete Employee
const deleteSingleEmployee = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/employees/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllEmployees, getEmployeesByID, createEmployee, updateEmployee, getSingleEmployee, deleteSingleEmployee };
