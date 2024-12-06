'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationForm from '../../../../components/forms/LocationForm';
import { getSingleLocation } from '../../../../api/locationData';

export default function EditLocation({ params }) {
  const [editLocation, setEditLocation] = useState({});

  // Get the Location's firebaseKey
  const { firebaseKey } = params;

  // make api call to get Location data
  useEffect(() => {
    if (!firebaseKey) {
      console.error('FirebaseKey is missing!');
      return;
    }

    getSingleLocation(firebaseKey)
      .then((data) => {
        // console.log('Location Data:', data);
        setEditLocation(data);
      })
      .catch((error) => console.error('Error fetching Location:', error));
  }, [firebaseKey]);

  // useEffect(() => {
  //   console.log('Updated editLocation:', editLocation);
  // }, [editLocation]);

  // Pass the Location object to the form
  return <LocationForm obj={editLocation} />;
}

EditLocation.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
