import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../axios/api';

const sec = 1000; // 1s from millisecond
const min = 60 * sec; // 1m from second
const tokenAge = min * 30 - sec; // 30m - 1s

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState({
    access: localStorage.getItem('accessToken'),
    refresh: localStorage.getItem('refreshToken'),
  });
  const [tokenExpiry, setTokenExpiry] = useState(
    localStorage.getItem('tokenExpiry'),
  );

  const signin = (user, token, expiresIn = tokenAge) => {
    // Save user and token
    // Save token to local storage

    // setUser(user);

    setToken(token);
    setTokenExpiry(Date.now() + expiresIn); // Convert expiresIn to milliseconds

    localStorage.setItem('accessToken', token.access);
    localStorage.setItem('refreshToken', token.refresh);
    localStorage.setItem('tokenExpiry', String(Date.now() + expiresIn));
  };

  const signout = () => {
    setToken(null);
    setTokenExpiry(null);

    // Clear token from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
  };

  const isAuthenticated = useCallback(() => {
    if (token?.access /**&& Date.now() < tokenExpiry */) {
      return true;
    }
    return false;
  }, [token]);

  // Automatically rotate token before expiry
  useEffect(() => {
    const rotateToken = () => {
      // Implement logic to refresh the token from your backend
      // For example, make a request to your backend to obtain a new token
      // Update the token and expiry accordingly
      api
        .post('token/refresh/', { refresh: token.refresh })
        .then((res) => {
          console.log('Token rotation in progress...');
          if (res) {
            // console.log(res.data)
            signin(null, res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let timeOutId;
    const tokenRotationInterval = () => {
      timeOutId = setTimeout(() => {
        // generate new token if user already logged in
        if (token.refresh) {
          rotateToken();
          tokenRotationInterval();
        }
      }, tokenAge);
    }; // Rotate token every 5 minutes

    tokenRotationInterval();

    return () => {
      if (timeOutId) {
        clearInterval(timeOutId);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, signin, signout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
