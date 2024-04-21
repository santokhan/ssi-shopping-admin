import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { LocationsContext } from '../../context/locations/locations-context';

const LocationsTableAction = ({ location, refetch }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  if (!location) {
    return null;
  }

  function onEdit() {
    navigate(`/areas/${location.id}/edit`);
  }

  function onDelete() {
    api
      .delete(`areas/${location.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/locations/${location.id}/edit`} />
      <ActionDelete onDelete={onDelete} />
    </div>
  );
};

const LocationsTableRow = ({ location, refetch }) => {
  if (!location) {
    return null;
  }

  return (
    <tr className="border-b bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <h3 className="text-base font-semibold leading-relaxed">
          {location.name}
        </h3>
      </td>
      <td className="px-6 py-4">
        <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
          <img
            src={location.icon}
            alt={location.icon}
            className="w-full h-full object-cover rounded-full overflow-hidden"
          />
        </div>
      </td>
      <td className="px-6 py-4">
        <LocationsTableAction location={location} refetch={refetch} />
      </td>
    </tr>
  );
};

const LocationsTable = ({ className = '' }) => {
  const { locations, setPageNumber, page_size, refetch } =
    useContext(LocationsContext);

  if (!locations) {
    return null;
  }

  const headList = ['locations title', 'locations image', 'action'];

  return (
    <>
      {locations.length > 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {locations.map((location, i) => {
                return (
                  <Fragment key={i}>
                    <LocationsTableRow location={location} refetch={refetch} />
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(locations.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(locations.length / page_size)}
            dataPerPage={10}
          />
        </div>
      ) : (
        <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
          No locations found
        </p>
      )}
    </>
  );
};

export default LocationsTable;
