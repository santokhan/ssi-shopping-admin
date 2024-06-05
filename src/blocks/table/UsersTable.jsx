import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { UsersContext } from '../../context/users/UserContext';
import TBody from '../../components/table/TBody';
import THead, { THeadList } from '../../components/table/THead';

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
      .then(refetch)
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
    <tr className="text-gray-900">
      <td className="px-6 py-4 font-medium text-gray-900">
        <h3 className="text-base font-semibold leading-relaxed capitalize">
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
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

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
            <THead>
              <THeadList headList={headList} />
            </THead>
            <TBody>
              {users
                .slice(page_size * (currentPage - 1), page_size * currentPage)
                .map((user, i) => {
                  return (
                    <Fragment key={i}>
                      <UsersTableRow user={user} refetch={refetch} />
                    </Fragment>
                  );
                })}
            </TBody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(users.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={currentPage}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={users.length}
            dataPerPage={page_size}
            currentPage={currentPage}
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
