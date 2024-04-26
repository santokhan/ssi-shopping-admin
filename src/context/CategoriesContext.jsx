import React, { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    const fetchLanguageCodes = async () => {
      try {
        setLoading(true);
        const response = await api.get('categories/');
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageCodes();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};
