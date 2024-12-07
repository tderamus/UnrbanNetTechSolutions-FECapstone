'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEmployee, updateEmployee } from '../../api/employeeData';
import { getAllLocations } from '../../api/locationData';

const initialState = {
  first_name: '',
  last_name: '',
  locationId: '',
};

function EmployeeForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [location, setLocation] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllLocations(user.uid).then((data) => {
      setLocation(data);
    });

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateEmployee(formInput).then(() => router.push(`/UserProfile/${obj.uid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEmployee(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEmployee(patchPayload).then(() => {
          router.push(`/UserProfile/${obj.uid}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black employee-form">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Employee</h2>

      {/* FIRSTNAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="First_Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter employee first name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* LASTNAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Last_Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter employee last name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* LOCATION SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Employee Location">
        <Form.Select aria-label="Employee Location" name="locationId" onChange={handleChange} className="mb-3" value={formInput.locationId || ''} required>
          <option value="">Select a Location</option>
          {location.map((employeeLocation) => (
            <option key={employeeLocation.firebaseKey} value={employeeLocation.firebaseKey}>
              {employeeLocation.city} {employeeLocation.state}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Employee</Button>
    </Form>
  );
}

EmployeeForm.propTypes = {
  obj: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default EmployeeForm;
