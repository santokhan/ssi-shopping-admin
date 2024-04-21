import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { AmenitiesContext } from '../../context/amenities/amenities-context';
import { twMerge } from 'tailwind-merge';
import DeleteModal from '../../components/DeleteModal';

const AmenitiesTableAction = ({ amenities, refetch }) => {
  const { api } = useAxios();
  const { setValue } = useContext(AmenitiesContext);
  const navigate = useNavigate();

  if (!amenities) {
    return null;
  }

  function onDelete() {
    api
      .delete(`amenities/${amenities.id}/`)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/amenities/${amenities.id}/edit`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const AmenitiesTableRow = ({ amenities, refetch }) => {
  if (!amenities) {
    return null;
  }

  return (
    <tr className="border-b bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <h3 className="text-base font-semibold leading-relaxed">
          {amenities.title}
        </h3>
      </td>
      <td className="px-6 py-4">
        <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
          <img
            src={amenities.icon}
            alt={amenities.icon}
            className="w-full h-full object-cover rounded-full overflow-hidden"
          />
        </div>
      </td>
      <td className="px-6 py-4">
        <AmenitiesTableAction amenities={amenities} refetch={refetch} />
      </td>
    </tr>
  );
};

const AmenitiesTable = ({ className = '' }) => {
  const { amenities, setPageNumber, page_size, refetch } =
    useContext(AmenitiesContext);

  if (!amenities) {
    return null;
  }

  const headList = ['amenities title', 'amenities image', 'action'];

  return (
    <>
      {amenities.length > 0 ? (
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
              {amenities.map((amenities, i) => {
                return (
                  <Fragment key={i}>
                    <AmenitiesTableRow
                      amenities={amenities}
                      refetch={refetch}
                    />
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(amenities.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(amenities.length / page_size)}
            dataPerPage={10}
          />
        </div>
      ) : (
        <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
          No amenities found
        </p>
      )}
    </>
  );
};

export default AmenitiesTable;
