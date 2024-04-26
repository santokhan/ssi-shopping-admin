import React, { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const AgentsContext = createContext(null);

const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await api.get('agents/');
      console.log(response.data);
      setAgents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <AgentsContext.Provider value={{ agents, loading, refetch: fetchAgents }}>
      {children}
    </AgentsContext.Provider>
  );
};

export default AgentsProvider;
