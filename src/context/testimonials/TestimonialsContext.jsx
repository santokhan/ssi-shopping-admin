import { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import Spinner from '../../components/loader/Spinner';

export const TestimonialsContext = createContext(null);

const TestimonialsProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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
      .get('testimonials/')
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
  }

  useEffect(fetchData, [page]);

  return (
    <TestimonialsContext.Provider
      value={{
        testimonials: state,
        setPageNumber,
        page,
        page_size,
        refetch: fetchData,
      }}
    >
      {loading ? <Spinner /> : children}
    </TestimonialsContext.Provider>
  );
};

export default TestimonialsProvider;
