import { useEffect, useState } from 'react';
import PropertiesTable from '../../blocks/table/PropertiesTable';
import api from '../../axios/api';
import Spinner from '../../components/loader/Spinner';
import { useParams, useSearchParams } from 'react-router-dom';
import filterListById from '../../utils/filterList';

const Agents = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const page_size = 10;
  const params = useParams();
  const [usp] = useSearchParams();
  const currentPage = parseInt(usp.get('page')) || 1;

  function fetchData(page) {
    if (!page) return;

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
    if (currentPage) {
      fetchData(parseInt(currentPage));
    }
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <PropertiesTable
          properties={properties}
          refetch={() => {
            fetchData(currentPage);
          }}
        />
      )}
    </>
  );
};

export default Agents;
