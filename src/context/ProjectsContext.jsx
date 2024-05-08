import React, { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('projects/');

      if (typeof res.data === 'object') {
        const data = res.data;
        setProjects(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, loading, fetchData }}>
      {children}
    </ProjectsContext.Provider>
  );
};
