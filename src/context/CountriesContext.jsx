import { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const CountriesContext = createContext(null);

const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      api
        .get('countries/')
        .then((res) => {
          if (res.data) {
            setCountries(res.data);
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
    <CountriesContext.Provider value={{ countries, loading }}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
