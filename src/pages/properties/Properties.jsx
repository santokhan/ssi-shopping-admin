import { useEffect, useState } from 'react';
import PropertiesTable from '../../blocks/table/PropertiesTable';
import api from '../../axios/api';
import Spinner from '../../components/loader/Spinner';
import { useParams } from 'react-router-dom';
import filterListById from '../../utils/filterList';

const Agents = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const page_size = 10;
  const params = useParams();

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
      .get('properties/', {
        params: {
          page: page,
          page_size: page_size,
        },
      })
      .then((res) => {
        if (typeof res.data === 'object') {
          const data = res.data;

          if (params.id && Array.isArray(data.results)) {
            data.results = filterListById(data.results, params.id);
            setProperties(data);
          } else {
            setProperties(data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <PropertiesTable
          properties={properties}
          refetch={fetchData}
          page_size={page_size}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
};

export default Agents;
