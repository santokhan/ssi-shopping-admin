import { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import Spinner from '../../components/loader/Spinner';

export const UsersContext = createContext(null);

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role: '',
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
      .get('users/')
      .then((res) => {
        if (res.data) {
          const data = res.data;
          if (data.results) {
            setUsers(res.data.results);
          }
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
    <UsersContext.Provider
      value={{
        users,
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
    </UsersContext.Provider>
  );
};

export default UsersProvider;
