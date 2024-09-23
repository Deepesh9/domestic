import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuthListener = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null, loading: true });

  useEffect(() => {
    if (!isLoading) {
      setAuth({
        isAuthenticated,
        role: user?.role || null, // Assuming the role is stored in the Auth0 user object
        loading: false,
      });
    }
  }, [isAuthenticated, isLoading, user]);

  return auth;
};

export default useAuthListener;
