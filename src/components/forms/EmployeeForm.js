// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import PropTypes from 'prop-types';
// import { Form, FloatingLabel, Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { createLocation, getAllLocations, updateLocation } from '../../api/locationData';

// const initialState = {
//   city: '',
//   state: '',
// };

// function LocationForm({ obj = initialState }) {
//   const [formInput, setFormInput] = useState(obj);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getAllLocations(user.uid);

//     if (obj.firebaseKey) setFormInput(obj);
//   }, [obj, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.firebaseKey) {
//       updateLocation(formInput).then(() => router.push(`/UserProfile/${obj.uid}`));
//     } else {
//       const payload = { ...formInput, uid: user.uid };
//       createLocation(payload).then(({ name }) => {
//         const patchPayload = { firebaseKey: name };
//         updateLocation(patchPayload).then(() => {
//           router.push('/ShowLocations/');
//         });
//       });
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="text-black location-form">
//       <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Location</h2>

//       {/* CITY INPUT  */}
//       <FloatingLabel controlId="floatingInput3" label="City" className="mb-3">
//         <Form.Control type="text" placeholder="Enter Name Of City" name="city" value={formInput.city} onChange={handleChange} required />
//       </FloatingLabel>

//       {/* STATE INPUT  */}
//       <FloatingLabel controlId="floatingInput3" label="State" className="mb-3">
//         <Form.Control type="text" placeholder="Enter Name Of State" name="state" value={formInput.state} onChange={handleChange} required />
//       </FloatingLabel>

//       <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Location</Button>
//     </Form>
//   );
// }

// LocationForm.propTypes = {
//   obj: PropTypes.shape({
//     city: PropTypes.string,
//     state: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }),
// };

// export default LocationForm;
