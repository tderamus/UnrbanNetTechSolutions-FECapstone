'use client';

import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../api/employeeData';
import EmployeeCard from '../../components/EmployeeCard';

function ShowEmployees() {
  const [emplooyees, setEmployees] = useState([]);

  const showAllEmployees = () => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('error fetching data', error);
      });
  };

  useEffect(() => {
    showAllEmployees();
  }, []);

  return (
    <div className="emmployee-card">
      {emplooyees.map((employee) => (
        <EmployeeCard key={employee.firebaseKey} employeeObj={employee} />
      ))}
    </div>
  );
}

export default ShowEmployees;
