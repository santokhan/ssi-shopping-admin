import { Fragment, useContext, useEffect, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import useAxios from '../../context/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { AgentsContext } from '../../context/AgentsContext';
import formatDate from '../../utils/formatDate';
import StatusIndicator from '../../components/StatusIndicator';
import { twMerge } from 'tailwind-merge';

const AgentTableDetailsField = ({ agent }) => {
  if (!agent) {
    return null;
  }

  return (
    <div className="flex w-72 flex-row items-center space-x-4 rounded-lg text-gray-800">
      <div className="grid size-20 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
        <img
          src={agent.photo}
          alt={agent.photo}
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
      </div>
      <div className="flex-grow">
        <h3
          className="text-base font-semibold leading-relaxed"
          title="Firstname Lastname (Display name)"
        >
          {[agent.first_name, agent.last_name].filter(Boolean).join(' ')} (
          {agent.display_name})
        </h3>
        <p className="text-sm text-gray-500 font-normal">{agent.location}</p>
        <p className="text-sm font-medium mt-2">
          <Link className="hover:underline" to={`tel:${agent.phone}`}>
            {agent.phone}
          </Link>
        </p>
      </div>
    </div>
  );
};

const AgentTableAction = ({ agent }) => {
  const { api } = useAxios();
  const navigate = useNavigate();
  const { refetch } = useContext(AgentsContext);

  function onDelete() {
    api
      .delete(`agents/${agent.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!agent) {
    return null;
  } else {
    return (
      <div className="flex gap-3">
        <ActionEdit to={`/agents/${agent.id}/edit`} />
        <DeleteModal onDelete={onDelete} />
      </div>
    );
  }
};

const AgentTableRow = ({ agent, SN = '' }) => {
  if (!agent) {
    return null;
  }

  return (
    <tr className=" bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <AgentTableDetailsField agent={agent} />
      </td>
      {/* created on */}
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {formatDate(agent.created_on)}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {formatDate(agent.updated_on)}
      </td>
      <td className="px-6 py-4">
        <StatusIndicator status={agent.status} />
      </td>
      <td className="px-6 py-4">{agent.properties}</td>
      <td className="px-6 py-4">
        <AgentTableAction agent={agent} />
      </td>
    </tr>
  );
};

const tableTitle = 'All Agents';

const TableTopSection = ({ onSearch = (needle = '') => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
          {tableTitle}
        </h2>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <TableSearch onFilter={onSearch} />
        <AddButton to="create">Add new agent</AddButton>
      </div>
    </div>
  );
};

const AgentTable = ({ setPageNumber, page_size }) => {
  const { agents } = useContext(AgentsContext);
  const [filteredAgents, setFilteredAgents] = useState([]);
  let agentsList = agents?.results;

  useEffect(() => {
    if (agentsList) {
      setFilteredAgents(agentsList);
    }
  }, [agentsList]);

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      // console.log({ needle });
      setFilteredAgents(
        /** Filter agents not already filtered items filteredAgents */
        agentsList.filter((agent) => {
          const target = agent.display_name.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFilteredAgents(agentsList);
    }
  }

  const TH = ({ children, className = '', ...props }) => (
    <th
      scope="col"
      className={twMerge('text-start px-6 py-3 whitespace-nowrap', className)}
      {...props}
    >
      {children}
    </th>
  );

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {filteredAgents ? (
        <div className="bg-white p-4 space-y-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <tr>
                  <TH>Agent Name</TH>
                  <TH>Date Added</TH>
                  <TH>Date Updated</TH>
                  <TH>Status</TH>
                  <TH>Properties</TH>
                  <TH className="rounded-r-lg">Action</TH>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAgents
                  .sort(
                    (a, b) => new Date(b.updated_on) - new Date(a.updated_on),
                  )
                  .map((agent, i) => {
                    return (
                      <Fragment key={i}>
                        <AgentTableRow agent={agent} SN={i + 1} />
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* <Pagination
            totalPages={new Array(Math.ceil(agentsList.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          /> */}
          {/* <TableSummary totalData={filteredAgents.length} /> */}
        </div>
      ) : (
        <p className="px-4">No records found</p>
      )}
    </div>
  );
};

export default AgentTable;
