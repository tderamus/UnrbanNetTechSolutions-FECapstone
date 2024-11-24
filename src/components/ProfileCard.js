import PropTypes from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function ProfileCard({ userData }) {
  return (
    <Container style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', paddingTop: '70px' }}>
      <Card
        style={{
          width: '400px',
          height: '800px',
          maxWidth: '400px',
          maxHeight: '800px',
          textAlign: 'center',
          backgroundColor: 'rgb(247, 157, 17)',
          border: '2px solid rgb(251, 71, 154)',
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Card.Img src={userData.image} alt={userData.name} style={{ width: '340px', height: '340px', objectFit: 'cover', marginBottom: '15px', marginTop: '15px' }} />
          </div>
          <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>@{userData.userName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1.2rem' }}>
            {userData.email}
          </Card.Subtitle>
          <Card.Text style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{userData.about}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    userName: PropTypes.string,
    about: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
