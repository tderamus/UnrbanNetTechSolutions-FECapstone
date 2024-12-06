import PropTypes from 'prop-types';
import React from 'react';

function ProfileCard({ userData }) {
  return <h1>Welcome Back {userData.name}!</h1>;
}

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
