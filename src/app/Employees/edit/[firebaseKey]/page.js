'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EmployeeForm from '../../../../components/forms/EmployeeForm';
import { getSingleEmployee } from '../../../../api/employeeData';

export default function EditEmployee({ params }) {
  const [editEmployee, setEditEmployee] = useState({});

  // Get the Location's firebaseKey
  const { firebaseKey } = params;

  // make api call to get Location data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getSingleEmployee(firebaseKey)
      .then((data) => {
        // console.log('Location Data:', data);
        setEditEmployee(data);
      })
      .catch((error) => console.error('Error fetching Location:', error));
  }, [firebaseKey]);

  // useEffect(() => {
  //   console.log('Updated editEmployee:', editEmployee);
  // }, [editEmployee]);

  // Pass the Location object to the form
  return <EmployeeForm obj={editEmployee} />;
}

EditEmployee.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
