'use clisnt';

import Signin from '../components/SignIn';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth;

  if (!user) {
    return <Signin />;
  }

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      Welcome to the UrbanNet Tech Solutions Asset Manager!
    </div>
  );
}

export default Home;
