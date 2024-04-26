import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { UsersContext } from '../../context/users/UserContext';

const UsersTableAction = ({ user, refetch }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  function onEdit() {
    navigate(`/users/${user.id}/edit`);
  }

  function onDelete() {
    api
      .delete(`users/${user.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/users/${user.id}/edit`} />
      <ActionDelete onDelete={onDelete} />
    </div>
  );
};

const UsersTableRow = ({ user, refetch }) => {
  if (!user) {
    return null;
  }

  return (
    <tr className="border-b bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <h3 className="text-base font-semibold leading-relaxed">
          {user.username}
        </h3>
      </td>
      <td className="px-6 py-4">{user.first_name}</td>
      <td className="px-6 py-4">{user.last_name}</td>
      <td className="px-6 py-4">
        {user.is_staff && 'Stuff'} {user.is_staff && 'Super User'}
      </td>
      <td className="px-6 py-4">
        <UsersTableAction user={user} refetch={refetch} />
      </td>
    </tr>
  );
};

const UsersTable = ({ className = '' }) => {
  const { users, setPageNumber, page_size, refetch } = useContext(UsersContext);

  if (!users) {
    return null;
  }

  const headList = [
    'Username',
    'first name',
    'last name',
    'stuff status',
    'action',
  ];

  return (
    <>
      {users.length > 0 ? (
        <div
          className={twMerge(
            className,
            'bg-white p-4 space-y-4 overflow-x-auto',
          )}
        >
          <table className="w-full text-sm text-gray-500 rtl:text-right">
            <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
              <tr>
                <th scope="col" className="text-start rounded-l-lg px-6 py-3">
                  {headList[0]}
                </th>
                <th scope="col" className="text-start px-6 py-3">
                  {headList[1]}
                </th>
                <th scope="col" className="text-start px-6 py-3">
                  {headList[2]}
                </th>
                <th scope="col" className="text-start px-6 py-3">
                  {headList[3]}
                </th>
                <th scope="col" className="text-start px-6 py-3">
                  {headList[4]}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <Fragment key={i}>
                    <UsersTableRow user={user} refetch={refetch} />
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(users.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(users.length / page_size)}
            dataPerPage={10}
          />
        </div>
      ) : (
        <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
          No records found
        </p>
      )}
    </>
  );
};

export default UsersTable;
