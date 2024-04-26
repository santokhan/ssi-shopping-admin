import { useContext, useState } from 'react';
import Spinner from '../../components/loader/Spinner';
import AgentTable from '../../blocks/table/AgentTable';
import AgentProvider, { AgentsContext } from '../../context/AgentsContext';

const Agents = () => {
  const [page, setPage] = useState(1);
  const page_size = 10;
  const { loading } = useContext(AgentsContext);

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

  return loading ? (
    <Spinner />
  ) : (
    <AgentTable setPageNumber={setPageNumber} page_size={page_size} />
  );
};

const AgentsPage = () => {
  return (
    <AgentProvider>
      <Agents />
    </AgentProvider>
  );
};

export default AgentsPage;
