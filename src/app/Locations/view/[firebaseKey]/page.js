'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLocationDetails } from '../../../../api/mergedData';
import EmployeeLocationViewCard from '../../../../components/EmployeeLocationViewCard';

export default function ViewLocationDetails({ params }) {
  const [locationDetails, setLocationDetails] = useState({});
  const [locationEmployees, setLocationEmployees] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getLocationDetails(firebaseKey)
      .then((data) => {
        setLocationDetails(data);
        setLocationEmployees(Object.values(data.employeeObject || {}));
      })
      .catch((error) => console.error('Error fetching employee:', error));
  }, [firebaseKey]);

  useEffect(() => {
    console.log('location details', locationDetails);
    console.log('location employees', locationEmployees);
  }, [locationDetails, locationEmployees]);

  return <div className="d-flex flex-wrap employee-view-card">{locationEmployees.length > 0 ? locationEmployees.map((employee) => <EmployeeLocationViewCard key={employee.firebaseKey} locationObj={{ ...employee, ...locationDetails }} onUpdate={() => getLocationDetails(firebaseKey)} />) : <p>No employees available for this location.</p>}</div>;
}

ViewLocationDetails.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
