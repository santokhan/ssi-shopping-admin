import React, { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const BlogsContext = createContext(null);

const BlogsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('blogs/');
      // console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BlogsContext.Provider value={{ data, loading, refetch: fetchData }}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;
