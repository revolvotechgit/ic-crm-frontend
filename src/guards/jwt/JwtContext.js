import { createContext, useState, useCallback, useEffect, useRef } from 'react';
import axios from 'src/utils/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  // Use refs to break circular dependencies
  const logoutRef = useRef();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = '';
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Store logout in ref to avoid dependency cycles
  logoutRef.current = logout;

  const login = useCallback(async (token) => {
    try {
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Get user data after login
      const response = await axios.get('/api/account/my-account');
      const userData = response.data;

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      logoutRef.current();
      throw error;
    }
  }, []); // No dependencies needed now

  // Initialize auth state from token
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          await login(token);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [login]);

  const register = useCallback(
    async (userData) => {
      try {
        const response = await axios.post('/api/register', userData);
        const { token } = response.data;
        await login(token);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    [login],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        login,
        logout,
        register,
        method: 'jwt',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
