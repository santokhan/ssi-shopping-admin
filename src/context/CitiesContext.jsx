import { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const CitiesContext = createContext(null);

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      api
        .get('cities/')
        .then((res) => {
          if (res.data) {
            setCities(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, loading }}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
