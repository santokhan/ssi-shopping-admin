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
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      console.log(token.access);
    }
    localStorage.setItem('refreshToken', token.refresh);
  };

  // Automatically rotate token before expiry
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    function rotateToken() {
      axios
        .post(`${API_URL}token/refresh/`, { refresh: refreshToken })
        .then((res) => {
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
          rotateToken();
        }
        // tokenRotationInterval();
      } else {
        // Generate new access token if not exists
        rotateToken();
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

  const value = {
    token,
    signin,
    signout() {
      setToken(null);

      // Clear token from local storage
      localStorage.removeItem('refreshToken');

      window.location.href = '/signin';
    },
    isAuthenticated: Boolean(token?.access),
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen flex-col justify-center items-center">
        <Logo />
        <span className="text-gray-600">Authenticating...</span>
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
};
