import { createContext, useEffect, useState } from 'react';
import useAxios from './useAxios';

export const AreasContext = createContext(null);

const AreasProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      api
        .get('areas/')
        .then((res) => {
          if (res.data) {
            setAreas(res.data);
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
    <AreasContext.Provider value={{ areas, loading }}>
      {children}
    </AreasContext.Provider>
  );
};

export default AreasProvider;
