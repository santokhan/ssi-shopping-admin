import { useEffect, useState } from 'react';
import Spinner from '../../components/loader/Spinner';
import AgentTable from '../../blocks/table/AgentTable';
import useAxios from '../../context/useAxios';

const Agents = () => {
  const [agents, setAgents] = useState(null);
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

  function fetchAgents() {
    setLoading(true);
    api
      .get('agents/')
      .then((res) => {
        if (res.data) {
          setAgents(res.data);
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

  useEffect(fetchAgents, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AgentTable
          agents={agents}
          setPageNumber={setPageNumber}
          page_size={page_size}
        />
      )}
    </>
  );
};

export default Agents;
