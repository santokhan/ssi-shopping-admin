import { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import Spinner from '../../components/loader/Spinner';

export const EnquiriesContext = createContext(null);

const EnquiriesProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({
    title: '',
    images: '',
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
      .get('enquiries/' /**enquiries */)
      .then((res) => {
        if (res.data) {
          setState(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // fetch('/api/enquiries.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setState(data);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  useEffect(fetchData, [page]);

  return (
    <EnquiriesContext.Provider
      value={{
        state,
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
    </EnquiriesContext.Provider>
  );
};

export default EnquiriesProvider;
