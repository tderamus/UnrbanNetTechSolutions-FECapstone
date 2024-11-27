'use clisnt';

import Signin from '../components/SignIn';
import { useAuth } from '../utils/context/authContext';
import UserProfile from './UserProfile/[uid]/page';

function Home() {
  const { user } = useAuth;

  if (!user) {
    return <Signin />;
  }

  return <UserProfile />;
}

export default Home;
