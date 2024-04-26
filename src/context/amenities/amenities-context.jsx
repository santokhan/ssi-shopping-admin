import { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import Spinner from '../../components/loader/Spinner';

export const AmenitiesContext = createContext(null);

const AmenitiesProvider = ({ children }) => {
  const [amenities, setAmenities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({
    title: '',
    icon: '',
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
      .get('amenities/')
      .then((res) => {
        if (res.data) {
          setAmenities(res.data);
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
    <AmenitiesContext.Provider
      value={{
        amenities,
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
    </AmenitiesContext.Provider>
  );
};

export default AmenitiesProvider;
