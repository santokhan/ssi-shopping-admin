import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/API_URL';
import { jwtDecode } from 'jwt-decode';
import Logo from '../components/Logo';

const sec = 1000; // 1s from millisecond
const min = 60 * sec; // 1m from second
const tokenAge = min * 30 - sec; // 30m - 1s

export const AuthContext = createContext({
  access: null,
  refresh: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState({
    access: null,
    refresh: null,
  });
  const [loading, setLoading] = useState(true);

  const signin = (user, token, expiresIn = tokenAge) => {
    setToken(token);
    localStorage.setItem('refreshToken', token.refresh);
  };

  // Automatically rotate token before expiry
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    function rotateToken() {
      axios
        .post(`${API_URL}token/refresh/`, { refresh: refreshToken })
        .then((res) => {
          console.log('Token rotation in progress...');
          if (res) {
            signin(null, res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function generateToken() {
      axios
        .post(`${API_URL}token/refresh/`, { refresh: refreshToken })
        .then((res) => {
          console.log(`Generating new token`);
          if (res) {
            signin(null, res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    let timeOutId;
    const tokenRotationInterval = () => {
      timeOutId = setTimeout(() => {
        rotateToken(refreshToken);
        tokenRotationInterval();
      }, tokenAge);
    };

    if (refreshToken) {
      if (token.access) {
        const decoded = jwtDecode(token.access);
        const exp = decoded.exp;
        if (exp < Date.now() / 1000) {
          generateToken();
        }
        tokenRotationInterval();
      } else {
        generateToken();
      }
    } else {
      setLoading(false);
    }

    return () => {
      if (timeOutId) {
        clearInterval(timeOutId);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen flex-col justify-center items-center">
        <Logo />
        <span className="text-gray-600">Authenticating...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signin,
        signout() {
          setToken(null);

          // Clear token from local storage
          localStorage.removeItem('refreshToken');

          window.location.href = '/signin';
        },
        isAuthenticated() {
          return Boolean(token?.access);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
