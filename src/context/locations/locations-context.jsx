import { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import Spinner from '../../components/loader/Spinner';

export const LocationsContext = createContext(null);

const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({
    name: '',
    icon: '',
    country: '',
    city: '',
  });
  const { api } = useAxios();
  const page_size = 10;

  function setPageNumber(numOrIndex = page) {
    if (numOrIndex === 'next') {
      setPage((prev) => prev + 1);
    }
    if (numOrIndex === 'prev') {
      setPage((prev) => prev - 1);
    }
    if (typeof numOrIndex === 'number') {
      setPage(numOrIndex);
    }
  }

  function fetchData() {
    setLoading(true);
    api
      .get('areas/')
      .then((res) => {
        if (res.data) {
          setLocations(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {};
  }

  useEffect(fetchData, [page]);

  return (
    <LocationsContext.Provider
      value={{
        locations,
        setPageNumber,
        page,
        page_size,
        refetch: fetchData,
        value,
        setValue(name = '', value = '') {
          setValue((prev) => ({ ...prev, [name]: value }));
        },
      }}
    >
      {loading ? <Spinner /> : children}
    </LocationsContext.Provider>
  );
};

export default LocationsProvider;
