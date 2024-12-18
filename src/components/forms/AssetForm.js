'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAsset, updateAsset } from '../../api/assetData';
import { getAllLocations } from '../../api/locationData';
import { getAllEmployees } from '../../api/employeeData';

const initialState = {
  image: ' ',
  name: ' ',
  notes: ' ',
  assetNo: ' ',
  modelNo: ' ',
  serialNo: ' ',
  type: ' ',
  isDeployed: ' ',
  locationId: ' ',
  price: ' ',
  assignment: ' ',
};

function AssetForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [location, setLocation] = useState([]);
  const [employee, setEmployee] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllLocations(user.uid).then((data) => {
      setLocation(data);
    });

    getAllEmployees(user.uid).then((data) => {
      setEmployee(data);
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
      updateAsset(formInput).then(() => router.push(`/UserProfile/${obj.uid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAsset(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAsset(patchPayload).then(() => {
          router.push(`/UserProfile/${obj.uid}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black asset-form">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Asset</h2>

      {/* ASSET IMAGE */}
      <FloatingLabel controlId="floatingInput2" label="Enter an image url" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* ASSET NO  */}
      <FloatingLabel controlId="floatingInput1" label="Asset No" className="mb-3">
        <Form.Control type="text" placeholder="Enter asset number" name="assetNo" value={formInput.assetNo} onChange={handleChange} required />
      </FloatingLabel>

      {/* SERIAL NO  */}
      <FloatingLabel controlId="floatingInput1" label="Serial No" className="mb-3">
        <Form.Control type="text" placeholder="Enter serial number" name="serialNo" value={formInput.serialNo} onChange={handleChange} required />
      </FloatingLabel>

      {/* MODEL NO  */}
      <FloatingLabel controlId="floatingInput1" label="Model No" className="mb-3">
        <Form.Control type="text" placeholder="Enter model number" name="modelNo" value={formInput.modelNo} onChange={handleChange} required />
      </FloatingLabel>

      {/* ASSET NAME  */}
      <FloatingLabel controlId="floatingInput3" label="Asset Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter asset name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* ASSIGNMENT SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Assignment">
        <Form.Select aria-label="Assignment" name="assignment" onChange={handleChange} className="mb-3" value={formInput.assignment || ''} required>
          <option value="">Asset assigned to:</option>
          {employee.map((assigedEmployee) => (
            <option key={assigedEmployee.firebaseKey} value={assigedEmployee.firebaseKey}>
              {assigedEmployee.first_name} {assigedEmployee.last_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* ASSET TYPE RADIO BUTTONS */}
      <div className="mb-3">
        <Form.Label className="text-white">Asset Type</Form.Label>
        <div>
          {['Desktop', 'Laptop', 'Tablet', 'Mobile Phone', 'Docking Station', 'Hotspot', 'Router', 'Server', 'Smart Board/TV'].map((type) => (
            <Form.Check key={type} inline label={type} type="radio" id={`type-${type}`} name="type" value={type} checked={formInput.type === type} onChange={handleChange} className="text-white" />
          ))}
        </div>
      </div>

      {/* LOCATION SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Location">
        <Form.Select aria-label="Location" name="locationId" onChange={handleChange} className="mb-3" value={formInput.locationId || ''} required>
          <option value="">Select a Location</option>
          {location.map((assetLocation) => (
            <option key={assetLocation.firebaseKey} value={assetLocation.firebaseKey}>
              {assetLocation.city} {assetLocation.state}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* NOTES TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Notes" className="mb-3">
        <Form.Control as="textarea" placeholder="Enter asset deployment notes" style={{ height: '100px' }} name="notes" value={formInput.notes} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Asset Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isDeployed"
        name="isDeployed"
        label="isDeployed?"
        checked={formInput.isDeployed}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            isDeployed: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Asset</Button>
    </Form>
  );
}

AssetForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    assetNo: PropTypes.number,
    modelNo: PropTypes.string,
    serialNo: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.string,
    isDeployed: PropTypes.bool,
    locationId: PropTypes.string,
  }).isRequired,
};

export default AssetForm;
