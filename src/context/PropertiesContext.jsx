import React, { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const PropertiesContext = createContext(null);

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('properties/');

      if (typeof res.data === 'object') {
        const data = res.data;
        setProperties(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertiesContext.Provider value={{ properties, loading, fetchData }}>
      {children}
    </PropertiesContext.Provider>
  );
};
