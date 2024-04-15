import { Fragment } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';

const AgentTableDetailsField = ({ agent }) => {
  if (!agent) {
    return null;
  }

  return (
    <div className="flex w-72 flex-row items-center space-x-2 rounded-lg text-gray-800">
      <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
        <img
          src={agent.photo}
          alt={agent.photo}
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-relaxed">
          {agent.display_name}
        </h3>
        <p className="text-sm text-gray-500 font-normal">{agent.location}</p>
        <p className="text-sm font-medium mt-2">{agent.phone}</p>
      </div>
    </div>
  );
};

const AgentStatusIndicator = ({ status }) => {
  if (!status) {
    return null;
  }

  let backgroundColor, textColor, labelText;

  switch (status.toLowerCase()) {
    case 'active':
      backgroundColor = 'bg-green-100';
      textColor = 'text-green-600';
      labelText = 'Active';
      break;
    case 'inactive':
      backgroundColor = 'bg-red-100';
      textColor = 'text-red-600';
      labelText = 'Inactive';
      break;
    default:
      backgroundColor = 'bg-gray-100';
      textColor = 'text-gray-600';
      labelText = 'Unknown';
  }

  return (
    <span
      className={`inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold ${backgroundColor} ${textColor} hover:bg-${status}-200`}
    >
      {labelText}
    </span>
  );
};

const AgentTableAction = ({ agent }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  if (!agent) {
    return null;
  }

  function onEdit() {
    // will redirect to agent edit page
  }

  function onDelete() {
    api
      .delete(`agents/${agent.id}/`)
      .then((res) => {
        navigate('/agents');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit onEdit={onEdit} />
      <ActionDelete onDelete={onDelete} />
    </div>
  );
};

const AgentTableRow = ({ agent }) => {
  if (!agent) {
    return null;
  }

  return (
    <tr className="border-b bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <AgentTableDetailsField agent={agent} />
      </td>
      {/* created on */}
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {new Date(agent.created_on).toLocaleString()}
      </td>
      <td className="px-6 py-4">
        <AgentStatusIndicator status={agent.status} />
      </td>
      <td className="px-6 py-4">{null}</td>
      <td className="px-6 py-4">
        <AgentTableAction agent={agent} />
      </td>
    </tr>
  );
};

const tableTitle = 'All Agents';

const TableTopSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
          {tableTitle}
        </h2>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <TableSearch />
        <AddButton to="create">Add new agent</AddButton>
      </div>
    </div>
  );
};

const AgentTable = ({ agents, setPageNumber, page_size }) => {
  agents = agents?.results;

  return (
    <div className="space-y-4">
      <TableTopSection />
      {agents ? (
        <div className="bg-white p-4 space-y-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <tr>
                  <th scope="col" className="text-start rounded-l-lg px-6 py-3">
                    Agent Name
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    Date Added
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    Properties
                  </th>
                  <th scope="col" className="text-start rounded-r-lg px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, i) => {
                  return (
                    <Fragment key={i}>
                      <AgentTableRow agent={agent} />
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={new Array(Math.ceil(agents.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(agents.length / page_size)}
            dataPerPage={10}
          />
        </div>
      ) : (
        <p className="px-4">No properties found</p>
      )}
    </div>
  );
};

export default AgentTable;
