import React, { createContext, useContext } from 'react';
import { AuthContext } from './auth-context';
import axios from 'axios';
import API_URL from '../utils/API_URL';
import { jwtDecode } from 'jwt-decode';

export const AxiosContext = createContext();

function AxiosProvider({ children }) {
  const { token, signin } = useContext(AuthContext);
  const d = new Date();

  // create axios api instance
  const api = axios.create({
    baseURL: API_URL,
    timeout: 100000,
  });

  api.interceptors.request.use(
    async (config) => {
      // If a token exists, add it to the Authorization header
      if (token?.access) {
        const decoded = jwtDecode(token?.access);

        if (decoded.exp < d.getTime() / 1000) {
          window.location.reload();
        }

        config.headers.Authorization = `Bearer ${token.access}`;
      } else {
        // If token expired generate new token before API request
        try {
          const res = await axios.post(`${API_URL}token/refresh/`, {
            refresh: localStorage.getItem('refreshToken'),
          });

          if (res) {
            signin(null, res.data);
            return config;
          } else {
            console.erro('Something went wrong');
          }
        } catch (error) {
          console.error(error);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return (
    <AxiosContext.Provider value={{ api }}>{children}</AxiosContext.Provider>
  );
}

export default AxiosProvider;
