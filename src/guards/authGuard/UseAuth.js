import { useContext } from 'react';
import { AuthContext } from '../jwt/JwtContext';

//import { AuthContext } from '../auth0/Auth0Context';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('Auth Context is undefined. Make sure you are using AuthProvider correctly');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
