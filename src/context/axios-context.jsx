import React, { useContext, useState } from 'react';
import { AuthContext } from './auth-context';
import axios from 'axios';
import API_URL from '../utils/API_URL';
import { jwtDecode } from 'jwt-decode';

export const AxiosContext = React.createContext();

function AxiosProvider({ children }) {
  const { token } = useContext(AuthContext);
  const d = new Date();

  // create axios api instance
  const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

  api.interceptors.request.use(
    (config) => {
      // If a token exists, add it to the Authorization header
      if (token?.access) {
        const decoded = jwtDecode(token?.access);

        if (decoded.exp < d.getTime() / 1000) {
          window.location.reload();
        }

        config.headers.Authorization = `Bearer ${token.access}`;
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
